import React from "react";
import styled from "styled-components";
//
import Loading from "../components/Loading.js";
import api from "../utils/api";
import vars from "../styling/vars.js";

/*
  This page shows a schedule of TV shows tonight on US television
*/

const Select = props => {
  /*
    Build a select element for start time and end time
  */
  let times = [];
  for (let i = 8; i <= 24; i++) {
    times.push(i);
  }

  return (
    <select
      value={props.time}
      onChange={props.handleTimeChange.bind(null, props.timeType)}
    >
      {times.map(v => (
        <option key={v} value={v}>
          {/*Always use double digits before comma} */}
          {String(v).padStart(2, "0")}
        </option>
      ))}
    </select>
  );
};

// Check if mounted
let _isMounted = true;

class Tv extends React.Component {
  state = {
    loading: true,
    schedule: null,
    error: null,
    startTime: 21,
    endTime: 23
  };

  getTvSchedule() {
    // Get full tv schedule
    this.setState({
      loading: true,
      schedule: null,
      error: null
    });

    api.tvSchedule().then(results => {
      if (!_isMounted) return null;

      if (results.error) {
        this.setState({ loading: false, error: results.error });
      } else {
        this.setState({
          loading: false,
          schedule: results.data
        });
      }
    });
  }

  handleTimeChange = (time, event) => {
    // Set the start or endtime
    this.setState({
      [time]: event.target.value
    });
  };

  componentDidMount() {
    _isMounted = true;
    this.getTvSchedule();
  }

  componentWillUnmount() {
    _isMounted = false;
  }

  render() {
    const { schedule, loading, error, startTime, endTime } = this.state;

    // Loading
    if (loading) return <Loading />;

    // Error
    if (error) return <div className="container textCenter">{error}</div>;

    // Success, filter shows on before/after time
    const specificSchedule = schedule.filter(
      item =>
        parseInt(item.airtime, 10) >= startTime &&
        parseInt(item.airtime, 10) <= endTime
    );

    return (
      <div>
        <Header>
          Tonight on TV between
          <Select
            timeType="startTime"
            time={startTime}
            handleTimeChange={this.handleTimeChange}
          />
          and
          <Select
            timeType="endTime"
            time={endTime}
            handleTimeChange={this.handleTimeChange}
          />
        </Header>

        <div className="textCenter">
          {(startTime >= endTime || endTime <= startTime) &&
            `Your start and endtimes overlap, please adjust`}
        </div>

        <Schedule>
          {specificSchedule &&
            specificSchedule.map(
              ({ id, airtime, name, season, number, summary, url, show }) => (
                <li key={id}>
                  <div className="airtime">{airtime}</div>
                  <div className="poster">
                    <a rel="noopener noreferrer" target="_blank" href={url}>
                      {show.image &&
                        show.image.medium && (
                          <img src={show.image.medium} alt={show.name} />
                        )}
                    </a>
                  </div>
                  <div className="title">
                    <a
                      className="noun-un"
                      rel="noopener noreferrer"
                      target="_blank"
                      href={url}
                    >
                      {name}
                    </a>
                  </div>
                  {season &&
                    number && (
                      <div className="episodeNr">
                        {`
                          s${season}
                          e${String(number).padStart(2, "0")}
                        `}
                      </div>
                    )}
                </li>
              )
            )}
        </Schedule>
      </div>
    );
  }
}

export default Tv;

// Styling
const Header = styled.h1`
  select {
    background: none;
    border: 0;
    border-radius: 0;
    appearance: none;
    font-size: 16px;
    margin: 0 0.5em;
    border-bottom: 1px solid grey;
  }
`;

const Schedule = styled.ul`
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-wrap: wrap;
  padding: 0 10px;
  font-size: 0.8em;

  li {
    position: relative;
    flex: 0 0 130px;
    margin-bottom: 40px;
    text-align: center;
  }

  .poster {
    min-height: 100px;
  }

  img {
    width: 80%;
    margin: 10px 0;
    border-radius: 4px;
  }

  .airtime {
    background: #fff;
    position: absolute;
    top: 0;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    padding: 1px 5px;
    border-radius: 2px;
    font-family: monospace, sans-serif;
  }

  .episodeNr {
    color: grey;
  }

  @media (${vars.minS}) {
    li {
      flex: 0 0 170px;
    }

    .poster {
      min-height: 211px;
    }
  }
`;
