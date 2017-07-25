'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const getStatus = require('../selectors/getStatus')
const shadowBox = require('../styles/shadowBox')
const { PREVIEW_MIN_HEIGHT, PREVIEW_HEIGHT, INSPECTOR_MIN_HEIGHT } = require('../constants/sizes')

const Toolbar = require('./Toolbar')

const style = {

	self: css(shadowBox, {
		display: 'flex',
		flexDirection: 'column',
		minHeight: PREVIEW_MIN_HEIGHT,
		height: `calc(${ PREVIEW_HEIGHT } - var(--currentSize-vertical, 0px))`,
		maxHeight: `calc(100vh - ${ INSPECTOR_MIN_HEIGHT })`
	}),

	iframe: css({
		flexGrow: '1',
		padding: '.5em',
		minHeight: '0',
		border: 'none'
	})

}

module.exports = ({ statuses, currentComponent }) => (

	h('section', { className: style.self.toString() },
		h(Toolbar, {
			status: getStatus(statuses, currentComponent),
			label: currentComponent.name,
			url: currentComponent.url
		}),
		h('iframe', {
			key: currentComponent.id,
			className: style.iframe.toString(),
			src: currentComponent.url
		})
	)

)

module.exports.propTypes = {

	statuses: propTypes.object.isRequired,
	currentComponent: propTypes.object.isRequired

}