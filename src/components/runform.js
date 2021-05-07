import React from 'react';


class Runform extends React.Component {
    constructor(props){
        super(props);
        this.state={
           submitting: true,
           pace: false,
           time: false,
           distance: '',
           paceentry: '',
           pacetime: ''
        }
    }

    handleClickPace = () => {
       this.setState({
           pace: !this.state.pace,
           time: false
       })
    }
    handleClickTime = () => {
        this.setState({
            pace: false,
            time: !this.state.time
        })
     }
    updateDistance = e => {
        this.setState({
            distance: e.target.value
        })
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        let min = parseInt(this.state.paceentry.split(':')[0]);
        let sec = parseInt(this.state.paceentry.split(':')[1]);
        let time = (min * 60) + sec;
        let distance = parseInt(this.state.distance.split('m')[0] / 1600)
        let totalSeconds = (distance * time);
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        if(hours !== 0){
            this.setState({
                pacetime: hours + ':' + minutes + ':' + seconds,
            })
        }else{
            this.setState({
                pacetime: minutes + ':' + seconds,
            })
        }
        
    }
    
    render(){
        const {submitting, pace, time, distance, paceentry, pacetime} = this.state;
        return(
            <div className="paceform">
                <form>
                    <p>
                        <label for="pace">Pace <br />
                            <input id="pace" type="button" name="pace" value="Find a pace"  onClick={this.handleClickPace} />
                        </label>
                    </p>
                    <p>
                        <label for="time">Time <br />
                            <input id="time" type="button" name="time" value="Set a goal time" onClick={this.handleClickTime} />
                        </label>
                    </p>
                    
                </form>
                {pace &&
                    <div>PACE FORM
                        <form onSubmit={this.handleSubmit}>
                        <label for="distance">Distance: </label> <br />
                                    <select id="distance" defaultValue={distance} onChange={this.updateDistance}>
                                        <option value="select-format" disabled>Select distance</option>
                                        <option value="800m">800m</option>
                                        <option value="1500m">1500m</option>
                                        <option value="1600m">1600m</option>
                                        <option value="3200m">3200m</option>
                                        <option value="5000m">5000m</option>
                                        <option value="10000m">10000m</option>
                                        <option value="half-marathon">Half marathon</option>
                                        <option value="marathon">Marathon</option>
                                    </select><br />
                        <label for="paceentry">Pace: </label> <br />
                        <input id="paceentry" placeholder="Set your pace" type="text" name='paceentry' value={paceentry} onChange={this.handleChange} /><br />
                        <input type='submit'  value='Get time'></input>
                        </form>

                    </div>
                }
                {time &&
                    <div>TIME FORM</div>
                }
                {pacetime &&
                    <p>{pacetime}</p>
                }
            </div>
              
        )
    }
}

export default Runform;

