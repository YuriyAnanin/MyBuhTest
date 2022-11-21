//============================================================================================
// -- Переменные для настройки
//============================================================================================
const gulp              = require('gulp');
const concat            = require('gulp-concat');
const autoprefixer      = require('gulp-autoprefixer');
const cleanCSS          = require('gulp-clean-css');
const uglify            = require('gulp-uglify');
const browserSync       = require('browser-sync').create();
const plumber           = require('gulp-plumber');
const less              = require('gulp-less');
const rename            = require('gulp-rename');
const sourcemaps        = require('gulp-sourcemaps');
const imagemin          = require('gulp-imagemin');
const svgSprite 		= require('gulp-svg-sprite');
const changeCase        = require('change-case');
const changed           = require('gulp-changed');


//============================================================================================
// -- РАЗРЕШЕНИЯ ИЗОБРАЖЕНИЙ
//============================================================================================
const image_ext = '{svg,Svg,SVG,png,Png,PNG,jpg,Jpg,JPG,jpeg,Jpeg,JPEG,gif,Gif,GIF,bmp,BMP,Bmp}';

//============================================================================================
// -- ПУТИ ДО ФАЙЛОВ
//============================================================================================
const components     = './resources/components/',
	scripts          = './resources/js/',
	base             = './resources/base/basic/',
	images           = './resources/img/',
	fonts   		 = './resources/fonts/',
	plugins  		 = './resources/base/plugins/',
	vendor           = './resources/vendor/',
	commonCss        = './resources/base/common/',
	productionCss    = './public/css/',
	productionImg    = './public/img/',
	productionJs     = './public/js/',
	productionFonts  = './public/fonts/',
	html 			 = './public/',

	svgImg = [
		images + 'svg/*.svg'
	]

	devImg           = [
		images + '**/*.'     + image_ext,
        components + '**/*.' + image_ext
	],
	styleComponents  = [
		commonCss        + '*.less',
		base           	 + '*.less',
		vendor           + '**/*.css',
        vendor           + '**/*.less',
		plugins          + '**/*.less',
		components       + '**/*.less',
		'!' + components + '**/*.adaptive.less',
		'!/**/d_*/*.*',
		'!/**/d_*.*'
	],
	adaptiveStyleComponents = [
		commonCss + '*.adaptive.less',
		plugins + 	'**/*adaptive.less',
		commonCss + 'variables.less',
		components + '**/*.adaptive.less',
		'!/**/d_*/*.*',
		'!/**/d_*.*'
	],
	scriptComponents = [
		vendor     	    + '**/*.js',
		plugins 		+ '**/*.js',
		scripts         + '**/*.js',
		components      + '**/*.js',
		'!/**/d_*/*.*',
		'!/**/d_*.*'
	],
	imageDirs = [];

//============================================================================================
// -- Ватчеры файлов
//============================================================================================
function watch(){
	browserSync.init({
		server: {
			baseDir: html
		}
	});

	gulp.watch(styleComponents, styles);
	gulp.watch(adaptiveStyleComponents, stylesAdaptive);
	gulp.watch(scriptComponents, js);
	gulp.watch(devImg, image);
	gulp.watch(svgImg, svg);
	gulp.watch(html).on('change', browserSync.reload);
}

gulp.task('watch', watch);

//============================================================================================
// -- Компиляция и обработка LESS
//============================================================================================
function styles() {
	return gulp.src(styleComponents)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(concat('style.less'))
		.pipe(less())
		.pipe(autoprefixer({
			overrideBrowserslist: ['> 1%', 'last 2 versions', 'Firefox ESR'],
			cascade: false
		}))
		.pipe(rename('style.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(productionCss))
		.pipe(browserSync.stream());
}

function stylesAdaptive() {
	return gulp.src(adaptiveStyleComponents)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(concat('adaptive.less'))
		.pipe(less())
		.pipe(autoprefixer({
			overrideBrowserslist: ['> 1%', 'last 2 versions', 'Firefox ESR'],
			cascade: false
		}))
		.pipe(rename('adaptive.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(productionCss))
		.pipe(browserSync.stream());
}

gulp.task('stylesAll', gulp.parallel(styles, stylesAdaptive));

//============================================================================================
// -- JS and PHP
//============================================================================================
function js() {
	return gulp.src(scriptComponents)
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(productionJs))
		.pipe(browserSync.stream());
}

gulp.task('js', js);

//============================================================================================
// -- Оптимизация изображений
//============================================================================================
function image() {
	return gulp.src(devImg)
		.pipe(changed(productionImg))
		.pipe(plumber())
		.pipe(imagemin([
			// imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 7}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(rename(function (path) {
			path.basename = changeCase.lowerCase(path.basename);
			path.extname = changeCase.lowerCase(path.extname);
		}))
		.pipe(gulp.dest(productionImg))
		.pipe(browserSync.reload({
			stream: true
		}));
}

gulp.task('imageAll', gulp.parallel(image));

function svg() {
	return gulp.src(svgImg) // svg files for sprite
		.pipe(svgSprite({
			mode: {
				stack: {
					dest: "img",
					sprite: "../sprite.svg" //sprite file name
				}
			},
			shape: {
				spacing: { // Spacing related options
					padding: 0, // Padding around all shapes
					box: 'content' // Padding strategy (similar to CSS `box-sizing`)
				}
			}
		}))
		.pipe(gulp.dest(productionImg))
		.pipe(browserSync.reload({
			stream: true
		}));
}

gulp.task('svgSprite', gulp.parallel(svg));

//============================================================================================
// -- PRODUCTION
//============================================================================================
function ProductionStyles(){
	return gulp.src(styleComponents)
		.pipe(plumber())
		.pipe(concat('style.less'))
		.pipe(less())
		.pipe(autoprefixer({
			overrideBrowserslist: ['> 1%', 'last 3 versions', 'Firefox ESR'],
			cascade: false
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(rename('style.css'))
		.pipe(gulp.dest(productionCss))
}

function ProductionStylesAdaptive() {
	return gulp.src(adaptiveStyleComponents)
		.pipe(plumber())
		.pipe(concat('adaptive.less'))
		.pipe(less())
		.pipe(autoprefixer({
			overrideBrowserslist: ['> 1%', 'last 3 versions', 'Firefox ESR'],
			cascade: false
		}))
		.pipe(rename('adaptive.css'))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(gulp.dest(productionCss))
}

function ProductionScript(){
	return gulp.src(scriptComponents)
		.pipe(concat('scripts.js'))
		.pipe(uglify({
			toplevel: true
		}))
		.pipe(gulp.dest(productionJs))
}

gulp.task('production', gulp.parallel(ProductionStylesAdaptive, ProductionStyles, ProductionScript));

//============================================================================================

