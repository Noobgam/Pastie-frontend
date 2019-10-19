import React, { Component } from 'react'
import { Label } from 'reactstrap';
import { apiGet } from './common/api';
import { CodeBlock } from './common/common'
import { Button } from 'reactstrap';

import Prism from 'prismjs';
import '../index.css';
import '../prism.css';

import 'prismjs/plugins/line-numbers/prism-line-numbers';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-markup';
//include javascript as default fallback
import 'prismjs/components/prism-javascript';


function get(url) {
    return apiGet(url);
}

export default class SpecificPaste extends Component {

    componentWillMount() {
        this.setState({loaded:false})
        var href = new URL(window.location.href);
        var id = href.pathname.split('/', 2)[1];
        get('/getpaste/?id=' + id)
            .then(r => {
                if (r) {
                    if (r.status === 404) {
                        this.setState({
                            loaded:true, notFound:true
                        })
                    } else {
                        this.setState({
                            loaded:true, 
                            value:r.content, 
                            owner:r.owner, 
                            lang:r.lang, 
                            instant: r.instant,

                            // feed from url
                            id:id,
                        })
                        Prism.highlightAll();
                    }
                }
            });
        this.setState({isOpen: false});
      }
    
    render() {
        return (
            <div style={{padding:20}}>
                {this.state.loaded && ((!this.state.notFound && (
                    <div>
                        <Label for="paste-text"><b>Posted by:</b> <i>{this.state.owner}</i>
                            &nbsp;
                            <Button 
                                color="secondary" 
                                href={this.state.id + "/raw"}
                                size="sm"
                            >
                                raw
                            </Button>
                            <br/>
                            &nbsp;
                            {(this.state.instant && <div>
                                {new Date(this.state.instant).toLocaleString()}
                            </div>)}
                        </Label>
                        <CodeBlock value={this.state.value} lang={this.state.lang}/>
                    </div>
                )) || (this.state.notFound && (
                    <div> Not found =( </div>
                )))}
            </div>
        )
    }
}
