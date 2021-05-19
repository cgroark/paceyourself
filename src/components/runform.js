import React from 'react';


class Runform extends React.Component {
    constructor(props){
        super(props);
        this.state={
           pace: false,
           time: false,
           distance: 'select-distance',
           paceentry: '',
           pacetime: '',
           goalentry: '',
           form: false,
           requiredDist: false,
           requiredPace: false,
           distanceResult: '',
           requiredFormat: false
        }
    }

    handleClickPace = () => {
       this.setState({
            pace: true,
            time: false,
            form: true,
            paceentry: '',
            pacetime: '',
            goalentry: '',
            requiredDist: false,
            requiredPace: false
       })
    }
    handleClickTime = () => {
        this.setState({
            pace: false,
            time: true,
            form: true,
            paceentry: '',
            pacetime: '',
            goalentry: '',
            requiredDist: false,
            requiredPace: false
        })
     }
    updateDistance = e => {
        this.setState({
            distance: e.target.value,
            requiredDist: false
        })
    }
    handleChange = e => {
        this.setState({
            requiredPace: false,
            requiredFormat: false
        })
        if(e.target.value.match("^[0-9|:]*$")!=null ){
            if(e.target.value.length === 1 ){
                this.setState({
                    [e.target.name]: e.target.value
                })
            }
            else if(e.target.value.length === 2 && e.target.value.indexOf(':') === -1 ){
                e.target.value = e.target.value + ":"
                this.setState({
                    [e.target.name]: e.target.value
                })
            }else if(e.target.value.length === 2 && e.target.value.indexOf(':') === 1 ){
                e.target.value = "0"+e.target.value
                this.setState({
                    [e.target.name]: e.target.value
                })
            }
        
            else{
                this.setState({
                    [e.target.name]: e.target.value
                })
            } 
        }
    }
    handleSubmit = event => {
        event.preventDefault();
        const {pace, time, paceentry, goalentry, distance, requiredDist, distanceResult} = this.state;
        let regex = /([0-5][0-9]:[0-5][0-9])/
        let regexHours = /([0-9][0-9]:[0-5][0-9]:[0-5][0-9])/
        if((paceentry.match(regex) != null) || (goalentry.match(regex) != null) || (goalentry.match(regexHours) != null)){
            if((distance !== 'select-distance') && (paceentry !== "" || goalentry !== "")){
                this.setState({
                    form: false,
                    requiredDist: false,
                    distanceResult: distance
                })
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
                if(pace){
                    timetotal = (parseInt(paceentry.split(':')[0]) * 60) + parseInt(paceentry.split(':')[1]); 
                    totalSeconds = (distancetotal * timetotal);
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
                this.setState({
                    distance: 'select-distance'
                })
            }else if(distance === 'select-distance'){
                this.setState({
                    requiredDist: true
                })
            }else if(paceentry === ""){
                this.setState({
                    requiredPace: true
                })
            }
            else if(goalentry === ""){
                this.setState({
                    requiredPace: true
                })
            }
        }else{
            this.setState({
                requiredFormat: true
            })
        }
    }
    
    render(){
        const {pace, time, distance, paceentry, pacetime, goalentry, form, requiredDist, requiredPace, distanceResult, requiredFormat} = this.state;
        return(
            <div className="paceform">
                    <div>
                        <button id="pace" value=""  onClick={this.handleClickPace} >Get a time based on pace</button>
                        <button id="time" value="" onClick={this.handleClickTime} >Get a pace for your goal time</button>
                    </div>
                    <div>
                    {form &&
                        <form onSubmit={this.handleSubmit}>
                        <label htmlFor="distance">Distance </label> 
                                    <select id="distance" defaultValue={distance} onChange={this.updateDistance}>
                                        <option value="select-distance" disabled>Select distance</option>
                                        <option value="800m">800m</option>
                                        <option value="1500m">1500m</option>
                                        <option value="1600m">1600m</option>
                                        <option value="3200m">3200m</option>
                                        <option value="5000m">5000m</option>
                                        <option value="10000m">10000m</option>
                                        <option value="half-marathon">Half marathon</option>
                                        <option value="marathon">Marathon</option>
                                    </select><br />
                                    {requiredDist &&
                                        <div className="required-alert"><p><i className="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp;Select a distance</p></div>
                                    }
                        {pace &&        
                            <div>
                                <label htmlFor="paceentry">Pace per mile </label> 
                                <input 
                                    id="paceentry" 
                                    placeholder="MM:SS" 
                                    type="text" 
                                    name='paceentry' 
                                    value={paceentry} 
                                    maxLength="5"
                                    minLength="5"
                                    onChange={this.handleChange} 
                                    
                                />
                                <br />
                            </div>
                            
                        }
                        {pace && requiredPace &&
                                <div className="required-alert"><p><i className="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp;Set a pace</p></div>
                        }
                        {time &&
                            <div>
                                <label htmlFor="goalentry">Goal time </label> 
                                <input 
                                    id="goalentry" 
                                    placeholder="(HH:)MM:SS"  
                                    type="text" 
                                    name='goalentry' 
                                    maxLength="8"
                                    minLength="5"
                                    value={goalentry} 
                                    onChange={this.handleChange} /><br />
                            </div>
                        }
                        {time && requiredPace &&
                                <div className="required-alert"><p><i className="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp;Set a goal</p></div>
                        }
                        {requiredFormat &&
                                <div className="required-alert"><p><i className="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp;Invalid time format</p></div>
                        }
                        <input type='submit'  value='Run it'></input>
                        </form>
                    }
                    </div>
                
                {time && pacetime &&
                    <div className="result"><h2>Pace for a {goalentry} {distanceResult}:<br /><span>{pacetime} mile</span></h2></div>
                }
                {pace && pacetime &&
                    <div className="result"><h2>Time for a {distanceResult} at {paceentry} pace:<br /><span>{pacetime}</span></h2></div>
                }
            </div>
              
        )
    }
}

export default Runform;

