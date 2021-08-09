const log = console.log.bind(console)

const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `${selector} 写错了`
        alert(s)
        return null
    } else {
        return element
    }
}

const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `${selector} 写错了`
        alert(s)
        return []
    } else {
        return elements
    }
}

const appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const removeClassAll = function(className) {
    let selector = '.' + className
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        e.classList.remove(className)
    }
}

const bindAll = function(selector, eventName, callback) {
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

const find = function(element, selector) {
    let e = element.querySelector(selector)
    if (e === null) {
        let s = `${selector} 写错了`
        alert(s)
        return null
    } else {
        return e
    }
}

let clockId1 = 1
const  nextIndex = function (slide, offset) {
    let numberOfImgs = parseInt(slide.dataset.imgs, 10)
    let activeIndex = parseInt(slide.dataset.active, 10)
    let index = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return index
}

const bindEventSlide = function() {
    let selector = '.slide-button'
    bindAll(selector, 'click', function(event) {
        clearInterval(clockId1)
        let self = event.target
        let slide = self.closest('.slide')
        let offset = Number(self.dataset.offset)
        let index = nextIndex(slide, offset)
        showAtIndex(slide, index)
        autoPlay()
    })

}

const showImageAtIndex = function (slide, index) {
    slide.dataset.active = String(index)
    let nextSelector = '#id-image-' + String(index)
    let className = 'slide-image-active'
    removeClassAll(className)
    let img = e(nextSelector)
    img.classList.add(className)
}

const showDotAtIndex = function (index) {
    removeClassAll('dot-active')
    let dotSelector = '#id-dot-' + String(index)
    let dot = e(dotSelector)
    dot.classList.add('dot-active')
}

const showAtIndex = function (slide,index) {
    showImageAtIndex(slide,index)
    showDotAtIndex(index)

}


const bindEventDot = function() {
    let selector = '.slide-dot'
    bindAll(selector, 'mouseover', function(event) {
        clearInterval(clockId1)
        let self = event.target
        let index = Number(self.dataset.index)
        let slide = self.closest('.slide')
        showAtIndex(slide, index)
    })
}

const bindEventDot2 = function() {
    let selector = '.slide-dot'
    bindAll(selector, 'mouseout', function(event) {
        autoPlay()
    })
}


const playNextImage = function() {
    let slide = e('.slide')
    let index = nextIndex(slide, 1)
    showAtIndex(slide, index)


}

const autoPlay = function() {
    let interval = 2000
    clockId1 = setInterval(function() {
        playNextImage()
    }, interval)
}


const bindEvents = function() {
    bindEventSlide()
    bindEventDot()
    bindEventDot2()
}


const __main = function() {
    bindEvents()
    autoPlay()
}

__main()
