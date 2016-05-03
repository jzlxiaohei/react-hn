'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var noop = function noop() {};

var MySlide = function () {
  function MySlide(container, options) {
    _classCallCheck(this, MySlide);

    this.container = container;
    this.element = container.children[0];

    options = options || {};
    this.slidesNum = options.slidesNum || this.element.children.length;
    this.index = options.startIndex || 0;

    this.elementWidth = options.elementWidth;
    this.slideWidth = options.slideWidth;
    this.speed = options.speed === undefined ? 300 : options.speed;

    this.moveCallback = options.moveCallback || noop;
    this.endCallback = options.endCallback || noop;

    this._onMove = this.onTouchmove.bind(this);
    this._onEnd = this.onTouchend.bind(this);

    this.validIndexRange = options.validIndexRange || [1 - this.slidesNum, 0];
    this.minIndex = this.validIndexRange[0], this.maxIndex = this.validIndexRange[1];
    this.minX = this.minIndex * this.slideWidth, this.maxX = this.maxIndex * this.slideWidth;

    this.setup();
    this.move();
  }

  _createClass(MySlide, [{
    key: 'setup',
    value: function setup() {
      var _this = this;

      //container width,
      var element = this.element;
      var style = element.style;
      style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = this.speed + 'ms';
      style.width = this.elementWidth + 'px';

      for (var i = 0; i < element.children.length; i++) {
        element.children[i].style.width = this.slideWidth + 'px';
      }

      this.container.style.visibility = 'visible';
      this.container.addEventListener('touchstart', function (event) {
        _this.onTouchstart(event);
      });
    }
  }, {
    key: 'onTouchstart',
    value: function onTouchstart(event) {
      var touches = event.touches[0];
      this.start = {
        x: touches.pageX,
        y: touches.pageY,
        time: +new Date()
      };
      this.isScrolling = undefined;
      this.delta = {};

      this.container.addEventListener('touchmove', this._onMove);
      this.container.addEventListener('touchend', this._onEnd);
    }
  }, {
    key: 'onTouchmove',
    value: function onTouchmove(event) {
      if (event.touches.length > 1 || event.scale && event.scale !== 1) return;
      //if(options.disableScroll)

      var touches = event.touches[0];
      var start = this.start;
      var delta = this.delta = {
        x: touches.pageX - start.x,
        y: touches.pageY - start.y
      };

      var isScrolling = this.isScrolling;
      if (typeof isScrolling == 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
        this.isScrolling = isScrolling;
      }
      if (!isScrolling) {
        //横向滑动为主,禁掉scroll. needed ?
        event.preventDefault();
        this.move(delta.x);
      }
      this.moveCallback(delta, event);
    }
  }, {
    key: 'onTouchend',
    value: function onTouchend(event) {
      var delta = this.delta;
      var duration = +new Date() - this.start.time;

      var absX = Math.abs(delta.x);
      var slideNumToMove = Math.round(absX / this.slideWidth + 0.2);

      var shouldMove = Number(duration) < 250 && absX > 20 || // if slide duration is less than 250ms  and if slide amt is greater than 20px
      slideNumToMove > 0;

      // determine direction of swipe (true:right, false:left)
      // this.currentDist += delta.x
      var direction = delta.x < 0;
      if (shouldMove) {
        if (direction) {
          this.index -= slideNumToMove || 1;
        } else {
          this.index += slideNumToMove || 1;
        }
      }
      this.normalizeIndex();
      this.move();

      this.container.removeEventListener('touchmove', this._onMove);
      this.container.removeEventListener('touchend', this._onEnd);

      this.endCallback(this.index, delta, event);
    }
  }, {
    key: 'move',
    value: function move() {
      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      var dist = this.index * this.slideWidth;
      this._translate(dist + x);
    }
  }, {
    key: 'normalizeIndex',
    value: function normalizeIndex() {
      var minIndex = this.minIndex;
      var maxIndex = this.maxIndex;

      if (this.index < minIndex) {
        this.index = minIndex;
      }
      if (this.index > maxIndex) {
        this.index = maxIndex;
      }
    }
  }, {
    key: 'slide',
    value: function slide(to) {
      this.index = to;
      this.normalizeIndex();
      this.move();
    }
  }, {
    key: '_translate',
    value: function _translate(dist) {
      // const {minX, maxX} = this
      // if (dist < minX || dist > maxX) {
      //   return;
      // }

      var style = this.element.style;
      style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
      style.msTransform = style.MozTransform = style.OTransform = 'translateX(' + dist + 'px)';
    }

    // circleIndex() {
    //   const index  = this.index
    //   const num = this.slidesNum
    //   this.index = (num + (index % num)) % num;
    // }

  }]);

  return MySlide;
}();

var container = document.getElementById('app');
var container2 = document.getElementById('app2');
var width = container.getBoundingClientRect().width || container.offsetWidth;

var slide1 = new MySlide(container, {
  slidesNum: 4,
  elementWidth: width,
  slideWidth: width / 4,
  validIndexRange: [0, 4 - 1], //[0,-3]
  speed: 100,
  moveCallback: function moveCallback(delta) {
    slide2.move(-delta.x * 4);
  },
  endCallback: function endCallback(index) {
    slide2.slide(-index);
  }
});

var slide2 = new MySlide(container2, {
  slidesNum: 4,
  elementWidth: width * 4,
  slideWidth: width,
  speed: 100,
  // validIndexRange:[-3,0],
  moveCallback: function moveCallback(delta) {
    slide1.move(-delta.x / 4);
  },
  endCallback: function endCallback(index) {
    slide1.slide(-index);
  }
});
