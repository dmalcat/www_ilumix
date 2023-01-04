'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify-es';
import rename from 'gulp-rename';
import themekit from '@shopify/themekit';
import del from 'del';

sass.compiler = require('node-sass');

const assetsPath = './styles';
const outputPath = './assets';

const paths = {
	styles: {
		vendor: {
			main: assetsPath + '/vendor/main.scss',
			src: assetsPath + '/vendor/**/*.scss',
			dest: outputPath
		},
		document: {
			main: assetsPath + '/document/main.scss',
			src: assetsPath + '/document/**/*.scss',
			dest: outputPath
		},
		core: {
			main: assetsPath + '/core/main.scss',
			src: assetsPath + '/core/**/*.scss',
			dest: outputPath
		},
		components: {
			main: assetsPath + '/components/main.scss',
			src: assetsPath + '/components/**/*.scss',
			dest: outputPath
		},
		ui: {
			main: assetsPath + '/ui/main.scss',
			src: assetsPath + '/ui/**/*.scss',
			dest: outputPath
		}
	},

};

export function vendorStyles() {
	return gulp.src(paths.styles.vendor.main)
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(rename({
			basename: '1-vendor',
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.styles.vendor.dest));
}

export function documentStyles() {
	return gulp.src(paths.styles.document.main)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(rename({
			basename: '2-document',
			suffix: '.min'
		}))
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest(paths.styles.document.dest));
}

export function coreStyles() {
	return gulp.src(paths.styles.core.main)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(rename({
			basename: '3-core',
			suffix: '.min'
		}))
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest(paths.styles.core.dest));
}

export function componentStyles() {
	return gulp.src(paths.styles.components.main)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(rename({
			basename: '4-components',
			suffix: '.min'
		}))
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest(paths.styles.components.dest));
}

export function uiStyles() {
	return gulp.src(paths.styles.ui.main)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(rename({
			basename: '5-ui',
			suffix: '.min'
		}))
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest(paths.styles.ui.dest));
}

function watchFiles() {
	gulp.watch(paths.styles.vendor.src, vendorStyles);
	gulp.watch(paths.styles.document.src, documentStyles);
	gulp.watch(paths.styles.core.src, coreStyles);
	gulp.watch(paths.styles.components.src, componentStyles);
	gulp.watch(paths.styles.ui.src, uiStyles);
	themekit.command('watch', {
		env: 'development'
	})
}

export { watchFiles as watch };

const build = gulp.series(gulp.parallel(vendorStyles, documentStyles, coreStyles, componentStyles, uiStyles));

export default build;
