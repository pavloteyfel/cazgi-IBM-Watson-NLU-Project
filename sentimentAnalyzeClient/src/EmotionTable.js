import React from "react";
import "./bootstrap.min.css";
import './EmotionTable.css';

class EmotionTable extends React.Component {
  render() {
    return (
      <div className="emotion-table">
        <br />
        <table className="table table-bordered table-sm">
          <tbody>
            {Object.entries(this.props.emotions).map(function (mapentry) {
              return (
                <tr>
                  <td>{mapentry[0]}</td><td>{`${(mapentry[1] * 100).toFixed(2)}%`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default EmotionTable;
