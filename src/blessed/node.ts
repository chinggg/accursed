import { Element, isElement, Node } from '../blessedTypes'
import { strip } from '../util/misc'

export type Visitor<T extends Node = Node> = (n: T) => boolean
/** settings for visitDescendants regarding visiting order and visit interruption modes. */
export interface VisitorOptions {
  childrenFirst?: boolean
  /**if a descendant visitor returned true, we stop visiting and signal up */
  breakOnDescendantSignal?: boolean
  /***no matter if visitor returns true for a node, it will still visit its descendants and then break the chain */
  visitDescendantsOnSelfSignalAnyway?: boolean
}

/**
 * Visit node's descendants until the visitor function return true or there are no more. In the first different modes on which visiting the rest of descenda|nts or
 * ancestors are configurable through the options. By default, first the parent is evaluated which is configurable configurable with [[[VisitorOptions.childrenFirst]]
 * */
export function visitDescendants(n: Node, v: Visitor, o: VisitorOptions = {}): boolean {
  let r = false
  if (o.childrenFirst) {
    r = n.children.some(c => visitDescendants(c, v, o))
    if (r) {
      if (!o.breakOnDescendantSignal) {
        v(n)
      }
      return true
    } else {
      return v(n)
    }
  } else {
    r = v(n)
    if (r) {
      if (!o.visitDescendantsOnSelfSignalAnyway) {
        return true
      } else {
        return n.children.some(c => visitDescendants(c, v, o)) || true // true because self was signaled
      }
    } else {
      return n.children.some(c => visitDescendants(c, v, o))
    }
  }
}

export type ElementPredicate<T extends Node = Node> = (n: T) => boolean

export function filterDescendants<T extends Node = Node>(n: Node, p: ElementPredicate, o: VisitorOptions = {}): T[] {
  const a: T[] = []
  visitDescendants(n, c => {
    if (p(c)) {
      a.push(c as T)
    }
    return false
  })
  return a
}

export function findDescendant<T extends Node = Node>(n: Node, p: ElementPredicate, o: VisitorOptions = {}) {
  let a: T | undefined
  visitDescendants(n, c => {
    if (p(c)) {
      a = c as T
      return true
    }
    return false
  })
  return a
}

export function findChildren<T extends Node = Node>(n: Node, p: ElementPredicate) {
  return n.children.find<T>(c => p(c))
}

export function filterChildren<T extends Node = Node>(n: Node, p: ElementPredicate) {
  return n.children.filter(c => p(c))
}
//TODO: ancestors, direct children and siblings. nice to have getFirstDescendantOfType, etc

/** Returns the text content of given node and all its descendants, in order. By default stripped from ansi escape chars and trimmed, and separated by space, but is configurable through options.  */
export function getContent(
  e: Element,
  options: { dontTrim?: boolean; dontStrip?: boolean; childrenLast?: boolean; includeHidden?: boolean } = {}
) {
  let text: string[] = [e.getContent()]
  visitDescendants(
    e,
    d => {
      if (isElement(d) && (!options.includeHidden && !d.hidden)) {
        let s = d.getContent() || ''
        if (!options.dontStrip) {
          s = strip(s)
        }
        if (!options.dontTrim) {
          s = s.trim()
        }
        text.push(s)
      }
      return false
    },
    { childrenFirst: !options.childrenLast }
  )
  return text.join(' ')
}

export function visitAscendants(n: Node, v: Visitor, o = {}): boolean {
  return !n || v(n) || !n.parent || visitAscendants(n.parent, v, o)
}

export function findAscendant<T extends Node = Node>(n: Element, p: ElementPredicate, o = {}) {
  let a: T | undefined
  visitAscendants(n, c => {
    if (p(c)) {
      a = c as T
      return true
    }
    return false
  })
  return a
}

export function filterAscendants<T extends Node = Node>(n: Node, p: ElementPredicate, o: VisitorOptions = {}): T[] {
  const a: T[] = []
  visitAscendants(n, c => {
    if (p(c)) {
      a.push(c as T)
    }
    return false
  })
  return a
}
