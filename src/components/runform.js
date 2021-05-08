import React from 'react';


class Runform extends React.Component {
    constructor(props){
        super(props);
        this.state={
           pace: false,
           time: false,
           distance: '',
           paceentry: '',
           pacetime: '',
           goalentry: '',
           form: false
        }
    }

    handleClickPace = () => {
       this.setState({
           pace: true,
           time: false,
           form: true,
           pacetime: '',

       })
    }
    handleClickTime = () => {
        this.setState({
            pace: false,
            time: true,
            form: true,
            pacetime: '',
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
        const {pace, time, paceentry, goalentry, distance} = this.state;
        let timetotal;
        let hours;
        let minutes;
        let seconds;
        let totalSeconds;
        let distancetotal;
        if(distance !== 'half-marathon' && distance !== 'marathon'){
            distancetotal = parseFloat(distance.split('m')[0]) / 1600;
        }else if(distance === 'half-marathon'){
            distancetotal = 13.1;
        }else{
            distancetotal = 26.2;
        }       
        console.log(distancetotal)
        if(pace){
            timetotal = (parseInt(paceentry.split(':')[0]) * 60) + parseInt(paceentry.split(':')[1]); 
            totalSeconds = (distancetotal * timetotal);
            console.log(totalSeconds)
        }
        if(time){
            let colons = 0;
            for(var i=0; i<goalentry.length;i++){
                if(goalentry[i] ===':'){
                    colons++
                }
            }
            if(colons === 1){
                timetotal = (parseInt(goalentry.split(':')[0]) * 60) + parseInt(goalentry.split(':')[1]);   
            }else{
                timetotal = (parseInt(goalentry.split(':')[0]) * 3600) + (parseInt(goalentry.split(':')[1]) * 60) + parseInt(goalentry.split(':')[2]);   
            }
            totalSeconds = (timetotal / distancetotal);
        }
        if(totalSeconds > 3600){
            hours = Math.floor(totalSeconds / 3600);
            minutes = Math.floor((totalSeconds - (hours * 3600)) / 60)
        }else{
            minutes = Math.floor(totalSeconds / 60);
            hours = 0;
        }
        seconds = Math.floor(totalSeconds % 60);
        if(seconds < 10){
            seconds = "0"+seconds;
        }
        if(hours !== 0 && minutes < 10){
            minutes = "0"+minutes;
        }
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
        const {submitting, pace, time, distance, paceentry, pacetime, goalentry, form} = this.state;
        return(
            <div className="paceform">
                    <div>
                        <button id="pace" value=""  onClick={this.handleClickPace} >Get a time based on pace</button>
                        <button id="time" value="" onClick={this.handleClickTime} >Get a pace for  your goal time</button>
                    </div>
                    <div>
                    {form &&
                        <form onSubmit={this.handleSubmit}>
                        <label for="distance">Select Distance </label> 
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
                        {pace &&        
                            <div>
                                <label for="paceentry">Pace </label> 
                                <input id="paceentry" placeholder="Set your pace" type="text" name='paceentry' value={paceentry} onChange={this.handleChange} /><br />
                            </div>
                        }
                        {time &&
                            <div>
                                <label for="goalentry">Goal time </label> 
                                <input id="goalentry" placeholder="Set your goal time" type="text" name='goalentry' value={goalentry} onChange={this.handleChange} /><br />
                            </div>
                        }
                        <input type='submit'  value='Run it'></input>
                        </form>
                    }
                    </div>
                
                {time && pacetime &&
                    <div><h2>Your pace should be: {pacetime}</h2></div>
                }
                {pace && pacetime &&
                    <div><h2>Your time will be: {pacetime}</h2></div>
                }
            </div>
              
        )
    }
}

export default Runform;

