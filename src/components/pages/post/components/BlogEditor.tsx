import { RefObject } from 'react';

import styles from './BlogEditor.module.scss';

// lib
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

interface BlogEditorProps {
  editorRef: RefObject<Editor>;
  value: string;
}

export default function BlogEditor({ editorRef, value }: BlogEditorProps) {
  return (
    <div className={styles.editorWrap}>
      <Editor
        previewStyle="vertical"
        initialEditType="markdown"
        initialValue={value}
        ref={editorRef}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        height="100%"
      />
    </div>
  );
}
