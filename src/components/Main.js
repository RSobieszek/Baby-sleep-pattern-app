import React from 'react'
import Pattern from './Pattern'
import ls from 'local-storage'

class Main extends React.Component {

    state = {
        tempNap: {
            date: "",
            nap: ["", ""]
        },
        patterns: []

        // how single pattern should look like
        // {
        //     date: null,
        //     time: [[1:00, 2:00], [7:00, 10:00]]
        // }
    }

    // check if there are any patterns in local storage
    componentDidMount() {
        // if there are none then create empty array prepared to store patterns
        if (ls.get('patterns') === null || ls.get('patterns').length === 0) {
            ls.set('patterns', [])
        } else {
            // get patterns from local storage and inject them into app
            this.setState({ patterns: [...ls.get('patterns')] })
        }
    }


    handleSubmit = (event) => {
        event.preventDefault()

        const tempNap = { ...this.state.tempNap }
        const patterns = [...this.state.patterns]

        // check if nap end is later than nap start
        if (tempNap.nap[1] <= tempNap.nap[0] && tempNap.nap[1].length > 0) {
            window.alert('Nap must end later than it started')
            tempNap.nap[1] = ""
            this.setState({ tempNap: tempNap })
        } else {
            // add nap to patterns and clear temporary nap
            const indexOfPattern = patterns.findIndex(pattern => pattern.date === tempNap.date)

            if (indexOfPattern !== -1) {
                patterns[indexOfPattern].time.push(tempNap.nap)
            } else {
                patterns.push({ date: tempNap.date, time: [tempNap.nap] })
            }

            this.setState((prevState) => {
                return {
                    patterns: [...patterns],
                    tempNap: {
                        date: "",
                        nap: ["", ""]
                    }
                }
            })

            // save patterns to local storage
            ls.set('patterns', [...patterns])
        }
    }

    handleChange = (event) => {
        event.preventDefault()
        const { name, value } = event.target
        let tempNap = { ...this.state.tempNap }

        switch (name) {
            case "day":
                tempNap.date = value
                break;
            case "start-time":
                tempNap.nap[0] = value
                break;
            case "end-time":
                tempNap.nap[1] = value
                break;

            default:
                break;
        }

        // TO HANDLE WRONG INPUT IN REAL TIME
        // if(tempNap.nap[1] <= tempNap.nap[0] && tempNap.nap[1].length > 0) {
        //     window.alert('Nap must end later than it started')
        //     tempNap.nap[1] = ""
        // }

        this.setState({ tempNap: tempNap })
    }

    render() {
        // preparing pattern list to display, sorted from newest to oldest
        const rendPatterns = this.state.patterns
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(
                pattern => <Pattern pattern={pattern} />
            )

        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <label>Day?
                        <input
                            type="date"
                            name="day"
                            onChange={this.handleChange}
                            value={this.state.tempNap.date} />
                    </label>
                    <label>Start time:
                        <input
                            type="time"
                            name="start-time"
                            onChange={this.handleChange}
                            value={this.state.tempNap.nap[0]} />
                    </label>
                    <label>End time:
                        <input
                            type="time"
                            name="end-time"
                            onChange={this.handleChange}
                            value={this.state.tempNap.nap[1]} />
                    </label>
                    <button type="submit">Add nap</button>
                </form>

                <div className="output">
                    {rendPatterns}
                </div>
            </React.Fragment>
        )
    }
}

export default Main


    // ---------------------------
    // MANAGE ADDING PATTERNS BY CLICKING ONLY ONE BUTTON: STATE
    // ---------------------------

    // isStart: true,
    // tempPattern: {
    //     date: null,
    //     start: [],
    //     end: []
    // },
    // patterns: []

    // ---------------------------
    // MANAGE ADDING PATTERNS BY CLICKING ONLY ONE BUTTON
    // ---------------------------

    // addDate = () => {
    //     if (this.state.isStart) {
    //         let time = new Date()
    //         this.setState(prevState => ({
    //             tempPattern: {...prevState.tempPattern, date: time, start: [time.getHours(), time.getMinutes(), time.getSeconds()]},
    //             isStart: !prevState.isStart
    //         }))
    //     } else {
    //         let time = new Date()
    //         this.setState(prevState => ({
    //             tempPattern: { ...prevState.tempPattern, end: [time.getHours(), time.getMinutes(), time.getSeconds()]},
    //             isStart: !prevState.isStart
    //         }))
    //         this.setState(prevState => ({
    //             patterns: [...prevState.patterns, prevState.tempPattern],
    //             tempPattern: {
    //                 date: null,
    //                 start: [],
    //                 end: []
    //             }
    //         }))
    //     }