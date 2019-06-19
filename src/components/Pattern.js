import React from 'react'

class Pattern extends React.Component {

    renderPattern = () => {
        let patternDivs = []
        const { time } = this.props.pattern

        // draw empty bar
        for (let i = 0; i < 1440; i++) {
            patternDivs.push(<div className="standard-div">&nbsp;</div>)
        }

        // draw green bar for each nap
        for (let e of time) {
            // convert nap time to numbers and then set how many minutes passed since 0:00
            // nap start time
            let startTime = e[0].split(':') //["01", "00"]
            const startHours = parseInt(startTime[0], 10)
            const startMinutes = parseInt(startTime[1], 10)
            const startTimeConvert = startHours * 60 + startMinutes

            // convert nap time to numbers and then set how many minutes passed since 0:00
            // nap end time
            const endTime = e[1].split(':')
            const endHours = parseInt(endTime[0], 10)
            const endMinutes = parseInt(endTime[1], 10)
            const endTimeConvert = endHours * 60 + endMinutes

            // new progress bar with naps
            const newDiv = patternDivs.map((div, i) => {
                if (i >= startTimeConvert && i <= endTimeConvert) {
                    return <div className="nap-div">&nbsp;</div>
                } else {
                    return div
                }
            })
            patternDivs = newDiv
        }
        return patternDivs
    }

    render() {
        const { date } = this.props.pattern

        return (
            <div>
                {date} <br />
                <div className="display-bar">
                    {this.renderPattern()}
                </div>
            </div>
        )
    }
}

export default Pattern

    // displayPattern = (start, end) => {

    //     let displayBar = []
    //     const startTime = start.split(':')
    //     const startHours = parseInt(startTime[0], 10)
    //     const startMinutes = parseInt(startTime[1], 10)
    //     const startTimeConvert = startHours * 60 + startMinutes
    //     console.log(startTimeConvert)

    //     const endTime = end.split(':')
    //     const endHours = parseInt(endTime[0], 10)
    //     const endMinutes = parseInt(endTime[1], 10)
    //     const endTimeConvert = endHours * 60 + endMinutes
    //     console.log(endTimeConvert)

    //     for (let i = 0; i < 1440; i++) {
    //         // if (i < startTimeConvert || i > endTimeConvert) {
    //         //     displayBar.push(<td>-</td>)
    //         // } else {
    //         //     displayBar.push(<td>+</td>)
    //         // }

    //         if (i < startTimeConvert || i > endTimeConvert) {
    //             displayBar.push(<div style={{backgroundColor: "grey", width: "0.5px"}}>&nbsp;</div>)
    //         } else {
    //             displayBar.push(<div style={{ backgroundColor: "green", width: "0.5px"}}>&nbsp;</div>)
    //         }
    //     }

    //     return displayBar
    // }