import React, { Component } from "react";
import './App.css';

class Exchange extends Component {
    state = {
        symbols: ['USD', 'EUR', 'UAH'],
        base: 'UAH',
        amount: '',
        to: '',
        result: '',
        date: ''
    }
    handleSelect = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            result: null
        })
        this.calculate.bind(this)
    }
    handleInput = (event) => {
        this.setState({
            amount: event.target.value,
            result: null
        })
        this.calculate.bind(this)
    }

    

     calculate = () => {
        const amount = this.state.amount;
        if(amount === isNaN){
            return;
        }else {
            let myHeaders = new Headers();
            myHeaders.append("apikey", "X2CKLzzwGkZrRM57JWPgtTqHIE9fwGf4");

            let requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
            };
            fetch("https://api.apilayer.com/fixer/convert?to={to}&base={base}&amount={amount}", requestOptions)
            .then(res => res.text())
            .then(data => {
                const date = data;
                const result = (date.rates[this.state.to] * amount).toFixed(3);
                this.setState({
                    result,
                     date

                })
                
            })
          
        }
    }
   
    handleSwap = (e) => {
        const base = this.state.base;
        const to = this.state.to;
        e.preventDefault();
        this.setState({
            to: base, base: to,
            result: null
        })
        this.calculate.bind(this)
    }
render() {
    const {symbols, base, to, amount, result, date} = this.state;
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-6 mx-auto">
                <div className="card card-body">
            <h5>{ amount } { base } is equal to</h5>
            <h4>{ result === null ? "Calculating" : result } { to }</h4>
            <p>As of { date }</p>
            <div className="row">
                <div className="col-lg-10 col-md-10 col-sm-10">
                    <form className="form-inline mb-4">
                        <input type="number" defaultValue={ amount } onChange={ this.handleInput } className="form-control form-control-lg mx-3"/>
                        <select name="base" defaultValue={ base } onChange={ this.handleSelect } className="form-control form-control-lg">
                            {symbols.map(symbol => (<option 
                            key={symbol}
                            value={symbol}
                            >{ symbol }</option>))}
                        </select>
                    </form>
                    <form className="form-inline mb-4">
                        <input disable="true" defaultValue={ result === null ? "Calculating..." : result } className="form-control form-control-lg mx-3"/>
                        <select name="to" defaultValue={ to } onChange={ this.handleSelect } className="form-control form-control-lg">
                            {symbols.map(symbol => (<option 
                            key={symbol}
                            value={symbol}
                            >{symbol}</option>))}
                        </select>
                    </form>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 align-self-center">
                    <h1 onClick={ this.handleSwap } className="swap">&#8595;&#8593;</h1>
                </div>
            </div>
        </div>
                </div>

            </div>
        </div>



      
    )
}

}
export default Exchange;


