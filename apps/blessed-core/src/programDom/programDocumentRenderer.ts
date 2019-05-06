import { ProgramElement } from './programElement';
import { Program } from '../declarations/program';
import {array} from 'misc-utils-of-mine-generic'
interface Point {
  ch: string
  // mode: string
}

export class ProgramDocumentRenderer {
  private debug: boolean
  private program: Program;
  private buffer: Point[][];
  private ch: string;
  constructor(options: Options){
    this.program = options.program
    this.debug = options.debug||false
    this.ch = options.defaultChar || ' '
    if(this.debug){
      this.buffer = array(this.program.rows).map(c=>array(this.program.cols).map(c=>({ch: this.ch})))
    }
  }
  renderElement(el: ProgramElement){
    this.renderElementWithoutChildren(el)
    // for(let c of  el.childNodes) {
    // this.renderElementWithoutChildren( el: c as any)

    // }
  }

  printBuffer() {
    return this.buffer.map(l=>l.map(c=>c.ch).join('')).join('\n')
  }
  renderElementWithoutChildren(el: ProgramElement){
    if(el.bg){
      this.program.bg(el.bg)
    }
    if(el.fg){
      this.program.fg(el.fg)
    }
    const ay = el.ay , ax= el.ax
    for (let i = 0; i < el.height; i++) {
      this.insert(ay+ i, ax, this.program.repeat(el.ch||this.ch, el.width));
    }
  }

  private insert(y: number, x: number, s: string) {
    this.program.cursorPos(y, x);
    this.program._write(s);
    if(this.debug){
      for(let i = 0; i<s.length; i++){
        this.buffer[y][x+i] = {ch:s[i]}
      }    
    }
  }
}

interface Options {
  // el: ProgramElement
  program: Program
  debug?: boolean
defaultChar?: string
}