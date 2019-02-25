//Dependencies
import React from 'react'

class Timer extends React.Component {

  constructor(props) {
    super(props)
    this.state = { timer: 3, timeLeft: 0 }
  }

  start = async () => {
    
    if( ! ('Notification' in window) || ! ('serviceWorker' in navigator) ) {
      return alert('Your browaser does not suport notifications')
    }

    if( Notification.permission === 'default' ) {
      await Notification.requestPermission()
    }

    let timer = this.state.timer
    this.setState({ timeLeft: timer })

    let countdownInterval = setInterval(() => {
      timer = timer - 1;
      this.setState({ timeLeft: timer }) 
      if( timer <= 0 ) { 
        clearInterval(countdownInterval) 
        this.showNotification()
      }
    }, 1000)
  }

  showNotification = async () => {
    const registration = await navigator.serviceWorker.getRegistration()
    if( ! registration ) return alert("No Service Worker :(")

    registration.showNotification("Timer ready!", {
      body: 'Ding ding ding',
      img: '/icon.png'
    })
  }

  handleChange = (e) => {
    this.setState({timer: e.target.value})
  }

  render () {
    const { timer, timeLeft } = this.state

    return <div className="Timer">
      <div className="name">Timer</div>
      { timeLeft === 0 ? 
        <div className="center">
          <input type="number" min="0" max="999" step="1" value={timer} onChange={this.handleChange} />
          <button onClick={ this.start }>Start</button>
        </div>
      :
        <div className="timeLeft">{ timeLeft }s</div>
      }
    </div>
  }
}

export default Timer;