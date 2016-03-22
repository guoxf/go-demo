module.exports={
    entry:'./entry.js',
    output:{
        path:__dirname,
        filename:"bundle.js"
    },
    resolve:{
        extends:['','.js','.ts','.tsx']
    },
    module:{
        loaders:[
            {test:  /\.css$/,loader:'style!css'},
            {test:/\.tsx$/,loader:'webpack-typescript?target=ES5&jsx=react'}
        ]
    }
}