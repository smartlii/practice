// fis.config.merge({
//     smdeps: {
//         file: [
//             'index.html'
//         ],
//         dir: [
//             'css', 'js'
//         ]
//     }
// });
//
// fis.match('*.scss', {
//     rExt: '.css',
//     parser: fis.plugin('node-sass')
// })
//
// fis.match('*.tmpl', {
//     rExt: '.js',
//     parser: fis.plugin('utc') // underscore 中的模板引擎
// });
// ?s.con?g.merge({
//       smdeps: {
//       ?le: [
//             'index.html'
//         ],
//         dir: [
//             'css', 'js'
//         ]
//       }
// });
// fis.match('*.scss', {
//       rExt: '.css',
//       parser:  ?s.plugin('node-sass')
// })
fis.match('*.tmpl', {
      rExt: '.js',
      parser: fis.plugin('utc')
});
fis.match('*.scss',{
      postprocessor : fis.plugin("autopre?xer",{
        "browsers": ['Firefox >= 20', 'Safari >= 6', 'Explorer >= 9', 'Chrome >= 12', "ChromeAndroid >= 4.0"],
        "?exbox?xer": true,
        "gradient?xer": true
      })
})