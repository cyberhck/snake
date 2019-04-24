/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game = /** @class */ (function () {
    function Game(arena, snakeColor) {
        if (snakeColor === void 0) { snakeColor = "#FF0"; }
        this.arena = arena;
        this.snakeColor = snakeColor;
        this.starting = {
            location: { x: 0, y: 0 },
            color: "#FF0"
        };
        this.direction = { x: 1, y: 0 };
        this.MAX_X = 50;
        this.MAX_Y = 50;
        this.currentFrog = null;
        this.isGameOver = false;
        this.lastStep = 0;
        this.currentFrame = 0;
        this.velocity = 500;
        arena.insert(this.starting);
        arena.insert(this.getDirectedPoint(this.starting.location));
        this.starting.color = snakeColor;
        this.spawnNewFrog();
    }
    Game.prototype.getCurrentFrog = function () {
        return this.currentFrog;
    };
    Game.prototype.getCurrentScore = function () {
        return this.arena.getAll().length;
    };
    Game.prototype.accelerate = function () {
        this.velocity = 100;
    };
    Game.prototype.decelerate = function () {
        this.velocity = 300;
    };
    Game.prototype.forceStep = function () {
        this.lastStep = this.currentFrame;
        var head = this.getDirectedPoint(this.arena.queryFirstElement().location);
        if (Game.areSameCoordinate(head.location, this.currentFrog.location)) {
            this.spawnNewFrog();
        }
        else {
            this.arena.remove();
        }
        if (this.snakeContainsCoordinates(head.location)) {
            this.onGameOverCallback("collided with body");
            this.isGameOver = true;
            return;
        }
        if (head.location.x > this.MAX_X || head.location.y > this.MAX_Y || head.location.x < 0 || head.location.y < 0) {
            this.onGameOverCallback("went through wall");
            this.isGameOver = true;
            return;
        }
        // if head collides with body, exit
        // if head collies with wall, exit
        this.arena.insert(head);
    };
    Game.prototype.step = function (dt) {
        if (this.isGameOver) {
            return;
        }
        this.currentFrame = dt;
        if (dt - this.lastStep < this.velocity) {
            return;
        }
        this.lastStep = dt;
        this.forceStep();
    };
    Game.prototype.onGameOver = function (fn) {
        this.onGameOverCallback = fn;
    };
    Game.prototype.setLeft = function () {
        this.getCurrentDirection() !== "RIGHT" && this.setDirection(-1, 0);
    };
    Game.prototype.setRight = function () {
        this.getCurrentDirection() !== "LEFT" && this.setDirection(1, 0);
    };
    Game.prototype.setDown = function () {
        this.getCurrentDirection() !== "UP" && this.setDirection(0, 1);
    };
    Game.prototype.setUp = function () {
        this.getCurrentDirection() !== "DOWN" && this.setDirection(0, -1);
    };
    Game.prototype.onDirectionChange = function (fn) {
        this.onDirectionChangeCallback = fn;
    };
    Game.prototype.getCurrentDirection = function () {
        if (this.direction.x == -1 && this.direction.y == 0) {
            return "LEFT";
        }
        if (this.direction.x == 1 && this.direction.y == 0) {
            return "RIGHT";
        }
        if (this.direction.x == 0 && this.direction.y == -1) {
            return "UP";
        }
        if (this.direction.x == 0 && this.direction.y == 1) {
            return "DOWN";
        }
    };
    Game.prototype.setDirection = function (x, y) {
        this.direction.x = x;
        this.direction.y = y;
        this.onDirectionChangeCallback();
    };
    Game.prototype.getDirectedPoint = function (cords) {
        return {
            location: {
                x: cords.x + this.direction.x, y: cords.y + this.direction.y
            },
            color: this.snakeColor
        };
    };
    Game.prototype.spawnNewFrog = function () {
        this.currentFrog = this.getFrog();
    };
    Game.prototype.getFrog = function () {
        var location = Game.getRandomLocation(this.MAX_X, this.MAX_Y);
        while (this.snakeContainsCoordinates(location)) {
            location = Game.getRandomLocation(this.MAX_X, this.MAX_Y);
        }
        // check if location exists on snake if so, then get a new one.
        return {
            location: location,
            color: "#0FF"
        };
    };
    Game.prototype.snakeContainsCoordinates = function (a) {
        return this.arena.getAll().some(function (x) { return Game.areSameCoordinate(x.location, a); });
    };
    Game.getRandomLocation = function (max_x, max_y) {
        return {
            x: Game.getRandomNum(max_x),
            y: Game.getRandomNum(max_y),
        };
    };
    Game.areSameCoordinate = function (a, b) {
        return a.x == b.x && a.y == b.y;
    };
    Game.getRandomNum = function (max) {
        return Math.floor(Math.random() * 100) % max;
    };
    return Game;
}());
exports.Game = Game;


/***/ }),

/***/ "./src/Queue.ts":
/*!**********************!*\
  !*** ./src/Queue.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Queue = /** @class */ (function () {
    function Queue() {
        this.items = [];
    }
    Queue.prototype.insert = function (item) {
        this.items = this.items.concat([item]);
    };
    Queue.prototype.remove = function () {
        var _a = this.items, _ = _a[0], rest = _a.slice(1);
        this.items = rest;
    };
    Queue.prototype.queryFirstElement = function () {
        return this.items[this.items.length - 1];
    };
    Queue.prototype.getAll = function () {
        return this.items;
    };
    return Queue;
}());
exports.Queue = Queue;


/***/ }),

/***/ "./src/Renderer.ts":
/*!*************************!*\
  !*** ./src/Renderer.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Renderer = /** @class */ (function () {
    function Renderer(canvas, backgroundColor) {
        this.canvas = canvas;
        this.backgroundColor = backgroundColor;
        this.scaleFactor = { x: 1, y: 1 };
        this.context = canvas.getContext("2d");
    }
    Renderer.prototype.scale = function (x, y) {
        this.scaleFactor = { x: x, y: y };
        this.context.scale(x, y);
    };
    Renderer.prototype.draw = function (cords) {
        var _this = this;
        cords.forEach(function (c) {
            _this.context.fillStyle = c.color;
            _this.context.fillRect(c.location.x, c.location.y, 1, 1);
            _this.context.fillStyle = _this.backgroundColor;
        });
    };
    Renderer.prototype.clear = function () {
        this.context.clearRect(0, 0, this.canvas.height * this.scaleFactor.y, this.canvas.width * this.scaleFactor.x);
    };
    return Renderer;
}());
exports.Renderer = Renderer;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(/*! ./Game */ "./src/Game.ts");
var Queue_1 = __webpack_require__(/*! ./Queue */ "./src/Queue.ts");
var Renderer_1 = __webpack_require__(/*! ./Renderer */ "./src/Renderer.ts");
var canvas = document.getElementById("arena");
var renderer = new Renderer_1.Renderer(canvas, "#FFF");
renderer.scale(10, 10);
var queue = new Queue_1.Queue();
var game = new Game_1.Game(queue);
var draw = function (queue, frog, renderer) {
    renderer.clear();
    renderer.draw(queue.getAll().concat([frog]));
    document.getElementById("score").innerText = game.getCurrentScore().toString();
};
game.onGameOver(function (reason) {
    console.log(reason);
});
game.onDirectionChange(function () {
    game.forceStep();
});
window.addEventListener("keyup", function (e) {
    switch (e.code) {
        case "ShiftLeft":
            game.decelerate();
            break;
        default:
            break;
    }
});
window.addEventListener("keydown", function (e) {
    switch (e.code) {
        case "ArrowUp":
            game.setUp();
            break;
        case "ArrowDown":
            game.setDown();
            break;
        case "ArrowLeft":
            game.setLeft();
            break;
        case "ArrowRight":
            game.setRight();
            break;
        case "ShiftLeft":
            game.accelerate();
            break;
        default:
            break;
    }
});
var loop = function () {
    var frog = game.getCurrentFrog();
    draw(queue, frog, renderer);
    requestAnimationFrame(loop);
};
loop();
var gameStep = function (dt) {
    game.step(dt);
    requestAnimationFrame(gameStep);
};
gameStep(0);


/***/ })

/******/ });
//# sourceMappingURL=dist.js.map