import React, { Component } from 'react'
import { Label } from 'reactstrap';
import { apiGet } from './common/api';
import { CodeBlock } from './common/common'
import Prism from 'prismjs';
import { Button } from 'reactstrap';
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

function renderPastes(pastes) {
    return pastes.map((paste) =>
        <div key={paste.id}>
            <Label for="paste-text"><b>Posted by:</b> <i>{paste.owner}</i>
                &nbsp;
                <Button color="info" href={"/" + paste.id}>full</Button> 
                &nbsp;
                <Button color="secondary" href={"/" + paste.id + "/raw"}>raw</Button>
            </Label>
            <CodeBlock value={paste.snippet} lang={paste.lang}/>
        </div>
    );
}

export default class RecentPastes extends Component {

    componentWillMount() {
        this.setState({loaded:false})
        var href = new URL(window.location.href);        
        var user = href.searchParams.get("user");
        var url = '/recent/';
        if (user !== null) {
            url += '?handle=' + user;
        }
        get(url)
            .then(r => {
                if (r) {
                    if (r.status === 404) {
                        this.setState({
                            loaded:true, notFound:true
                        })
                    } else {
                        this.setState({
                            loaded:true, pastes:r.pastes
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
                        {renderPastes(this.state.pastes)}
                    </div>
                )) || (this.state.notFound && (
                    <div> Not found =( </div>
                )))}
            </div>
        )
    }
}
