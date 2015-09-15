package utils

import (
	"html/template"
	"net/http"
	"net/url"
	"reflect"
	"regexp"
	"runtime"
	"strings"
)



type controllerInfo struct {
	regex          *regexp.Regexp
	params         map[int]string
	controllerType reflect.TYpe
}

type ControllerRegistor struct {
	routers     []*controllerInfo
	Application *App
}

func (p *ControllerRegistor) Add(parrern string, c ControllerInterface) {
	parts := strings.Split(parrern, "/")

	j := 0
	params := make(map[int]string)
	for i, part := range parts {
		if strings.HasPrefix(part, ":") {
			expr := "([^/]+)"

			//a user may choose to override the defult expression
			//similar to expressjs:'/user/:id([0-9]+)'

			if index := strings.Index(part, "("); index != -1 {
				expr = part[index:]
				part = part[:index]
			}
			params[j] = part
			parts[i] = expr
			j++
		}
	}

	//recreate the url pattern,with parameters replaced
	//by regular expressions.then compile(pattern)

	pattern = strings.Join(parts, "/")
	regex, regexErr := regexp.Compile(pattern)
	if regexErr != nil {
		//TODO add error handling here to avoid panic
		panic(regexErr)
		return
	}

	//now create route
	t := reflect.Indirect(reflect.ValueOf(c)).Type()
	route := &controllerInfo{}
	route.regex = regex
	route.params = params
	route.controllerType = t
	p.routers = append(p.routers, route)
}

func (p *ControllerRegistor) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	defer func() {
		if err := recover(); err != nil {
			if !RecoverPanic {
				panic(err)
			} else {
				Critical("Handler crashed with err", err)
				for i := 1; ; i += 1 {
					_, file, line, ok := runtime.Caller(i)
					if !ok {
						break
					}
				}
			}
		}
	}()
	var started bool
	for prefix, staticDir := range StaticDir {
		if strings.HasPrefix(r.URL.Path, prefix) {
			file := staticDir + r.URL.Path[len(prefix):]
			http.ServeFile(w, r, file)
			started = true
			return
		}
	}
	requestPath := r.URL.Path

	//find a matching Route
	for _, route := range p.routers {
		//check if Route pattern matches url
		if !route.regex.MatchString(requestPath) {
			continue
		}

		//get submatches(params)
		matchs := route.regex.FindStringSubmatch(requestPath)

		//double check that the Route matches the URL pattern.
		if len(matchs[0]) != len(requestPath) {
			continue
		}

		params := make(map[string]string)
		if len(route.params) > 0 {
			//add url parameters to the query param map
			values := r.URL.Query()
			for i, match := range matchs[1:] {
				values.Add(route.params[i], match)
				params[route.params[i]] = match
			}

			//reassemble query params and add to RawQuery
			r.URL.RawQuery = url.Values(values).Encode() + "&" + r.URL.RawQuery
		}
		//Invoke the request handler
		vc := reflect.New(route.controllerType)
		init := vc.MethodByName("Init")
		in := make([]reflect.Value, 2)
		ct := &Context{ResponseWriter: w, Request: r, Params: params}
		in[0] = reflect.ValueOf(ct)
		in[1] = reflect.ValueOf(route.controllerType.Name())
		init.Call(in)
		in = make([]reflect.Value, 0)
		method := vc.MethodByName("Prepare")
		method.Call(in)
		if r.Method == "GET" {
			method = vc.MethodByName("Get")
			method.Call(in)
		} else if r.Method == "POST" {
			method = vc.MethodByName("Post")
			method.Call(in)
		} else if r.Method == "DELETE" {
			method = vc.MethodByName("Head")
			method.Call(in)
		} else if r.Method == "DELETE" {
			method = vc.MethodByName("Delete")
		} else if r.Method == "PUT" {
			method = vc.MethodByName("Put")
			method.Call(in)
		} else if r.Method == "PATCH" {
			method = vc.MethodByName("Patch")
			method.Call(in)
		} else if r.Method == "OPTIONS" {
			method = vc.MethodByName("Options")
			method.Call(in)
		}

		if AutoRender {
			method = vc.MethodByName("Render")
			method.Call(in)
		}
		method = vc.MethodByName("Finish")
		method.Call(in)
		started = true
		break
	}

	//if no matches to url,throw a not found exception
	if started == false {
		http.NotFound(w, r)
	}
}

var StaticDir = make(map[string]string)

func (app *App) SetStaticPath(url string, path string) *App {
	StaticDir[url] = path
	return app
}
