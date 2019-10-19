import React, { Component } from 'react'

export function CodeBlock(props) {
    const lang = props.lang;
    if (lang) {
      return (
        <pre><code className={"line-numbers language-" + lang}>
              {props.value}
          </code></pre>
      );
    }
    return (
        <pre style={{"outline":"2px solid black"}}><code className={"line-numbers"}>
            {props.value}
        </code></pre>
    );
  }