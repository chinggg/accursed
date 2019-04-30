// associates EditorWidget with Documents
// responsible of dispatching /& coordinate, save(), open(), close(),etc

import { IEditor, Element, buildEditor } from 'accursed'
import { Document, State } from './state'
import { WORKSPACE_ACTION } from './actions';
import { notUndefined } from 'misc-utils-of-mine-typescript';


export interface DocumentEditor { editor: IEditor; document: Document }
const editors: { [path: string]: DocumentEditor } = {}

export async function getEditorFor(document: Document, parent: Element) {
  if (!editors[document.path]) {
    try {
      const text = (await this.props.context.fs.read(document.path)) || ''
      const editor = buildEditor({
        parent,
        text,  
        language: 'js'  
      })
      editors[document.path] = { editor, document }
    } catch (error) {
      this.dispatch({
        type: WORKSPACE_ACTION.NOTIFY_FILE_ERROR,
        error,
        msg: 'Error while opening file ' + this.props.document.path + ' to open it in editor-widget'
      })
      return undefined
    }
  }
  return editors[document.path]
}


export function getEditorsFor(documents: Document[], parents: []) {
  return documents.map((d,i)=>getEditorFor(d, parents[i])).filter(notUndefined)
}