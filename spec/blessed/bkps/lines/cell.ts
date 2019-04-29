// // Generated by CoffeeScript 2.4.1
// // (function() {
//   // cell
//   // var Cell, blankStyle, chooseCharacter, chooseColor;

//   import {chooseCharacter} from './char-query'
//   import    {chooseColor} from './color-query'

//   function blankStyle() {
//     return {
//       style: 'none',
//       color: {
//         foreground: 'none',
//         background: 'none'
//       }
//     };
//   };

//   export  class Cell {

//     protected _dirs: { left: any; up: any; right: any; down: any; }
//     constructor() {
//       this._dirs = {
//         left: blankStyle(),
//         up: blankStyle(),
//         right: blankStyle(),
//         down: blankStyle()
//       };
//     }

//     left() {
//       var color: { foreground: any; background: any; };
//       if (arguments.length) {
//         this._dirs.left.style = arguments[0];
//         if (arguments.length > 1) {
//           color = arguments[1];
//           if (color.foreground) {
//             this._dirs.left.color.foreground = color.foreground;
//           }
//           if (color.background) {
//             this._dirs.left.color.background = color.background;
//           }
//         }
//         return this;
//       } else {
//         return this._dirs.left;
//       }
//     }

//     up() {
//       var color: { foreground: any; background: any; };
//       if (arguments.length) {
//         this._dirs.up.style = arguments[0];
//         if (arguments.length > 1) {
//           color = arguments[1];
//           if (color.foreground) {
//             this._dirs.up.color.foreground = color.foreground;
//           }
//           if (color.background) {
//             this._dirs.up.color.background = color.background;
//           }
//         }
//         return this;
//       } else {
//         return this._dirs.up;
//       }
//     }

//     right() {
//       var color: { foreground: any; background: any; };
//       if (arguments.length) {
//         this._dirs.right.style = arguments[0];
//         if (arguments.length > 1) {
//           color = arguments[1];
//           if (color.foreground) {
//             this._dirs.right.color.foreground = color.foreground;
//           }
//           if (color.background) {
//             this._dirs.right.color.background = color.background;
//           }
//         }
//         return this;
//       } else {
//         return this._dirs.right;
//       }
//     }

//     down() {
//       var color: { foreground: any; background: any; };
//       if (arguments.length) {
//         this._dirs.down.style = arguments[0];
//         if (arguments.length > 1) {
//           color = arguments[1];
//           if (color.foreground) {
//             this._dirs.down.color.foreground = color.foreground;
//           }
//           if (color.background) {
//             this._dirs.down.color.background = color.background;
//           }
//         }
//         return this;
//       } else {
//         return this._dirs.down;
//       }
//     }

//     toString() {
//       console.log({
//         left: this.left().style,
//         up: this.up().style,
//         right: this.right().style,
//         down: this.down().style
//       });

//       return {
//         char: chooseCharacter({
//           left: this.left().style,
//           up: this.up().style,
//           right: this.right().style,
//           down: this.down().style
//         }),
//         color: chooseColor({
//           left: this.left().color,
//           up: this.up().color,
//           right: this.right().color,
//           down: this.down().color
//         })
//       };
//     }

//   };

// export function cell() {
//     return new Cell();
//   };
