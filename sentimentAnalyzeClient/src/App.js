import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import React from 'react';

class App extends React.Component {
  state = {
    innercomp: <textarea rows="4" cols="50" id="textinput" />,
    mode: "text",
    sentimentOutput: [],
    sentiment: true
  }

  renderOutput = (input_mode) => {
    let rows = 1
    let mode = "url"
    if (input_mode === "text") {
      mode = "text"
      rows = 4
    }
    this.setState({
      innercomp: <textarea rows={rows} cols="50" id="textinput" />,
      mode: mode,
      sentimentOutput: [],
      sentiment: true
    });
  }

  sendForSentimentAnalysis = () => {
    this.setState({ sentiment: true });
    let textInput = document.getElementById("textinput").value;
    let url = ".";
    let mode = this.state.mode
    url = url + "/" + mode + "/sentiment?" + mode + "=" + textInput;

    fetch(url).then((response) => {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        response.json().then((data) => {
          this.setState({ sentimentOutput: data.label });
          let output = data.label;
          let badge = ""
          switch (output) {
            case "positive":
              badge = "badge-success";
              break;
            case "negative":
              badge = "badge-danger";
              break;
            default:
              badge = "badge-warning";
          }
          output = <span className={`badge ${badge}`}>{output}</span>;
          this.setState({ sentimentOutput: output });
        })
      } else {
        response.text().then(text => {
          let output = <div class="alert alert-danger" role="alert">{text}</div>
          this.setState({ sentimentOutput: output });
        })
      }
    });

  }

  sendForEmotionAnalysis = () => {
    this.setState({ sentiment: false });
    let url = ".";
    let mode = this.state.mode
    url = url + "/" + mode + "/emotion?" + mode + "=" + document.getElementById("textinput").value;

    fetch(url).then((response) => {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        response.json().then((data) => {
          this.setState({ sentimentOutput: <EmotionTable emotions={data} /> });
        })
      } else {
        response.text().then(text => {
          let output = <div class="alert alert-danger" role="alert">{text}</div>
          this.setState({ sentimentOutput: output });
        })
      }
    });
  }

  componentDidMount = () => {
    document.title = "Sentiment Analyzer";
  };

  render() {
    return (
      <div className="App">
        <button className="btn btn-info" onClick={() => { this.renderOutput('text') }}>Text</button>&nbsp;
        <button className="btn btn-dark" onClick={() => { this.renderOutput('url') }}>URL</button>
        <br /><br />
        {this.state.innercomp}
        <br />
        <button className="btn btn-primary" onClick={this.sendForSentimentAnalysis}>Analyze Sentiment</button>&nbsp;
        <button className="btn btn-primary" onClick={this.sendForEmotionAnalysis}>Analyze Emotion</button>
        <br />
        {this.state.sentimentOutput}
      </div>
    );
  }
}

export default App;
