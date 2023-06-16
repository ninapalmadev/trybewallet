import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestAPI, saveExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    description: '',
    value: '',
    method: 'Dinheiro',
    tag: 'LAZER',
    exchangeRates: [],
    currency: 'USD',
  };

  componentDidMount() {
    const { dispatchRequestAPI } = this.props;
    dispatchRequestAPI();
  }

  handleFetchApi = async () => {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const data = await fetch(URL);
    const response = await data.json();
    this.setState({ exchangeRates: response });

    const { value, method, description, currency, tag, exchangeRates } = this.state;
    const { wallet: { expenses }, dispatchHandleFetchApi } = this.props;

    const newID = expenses.length;
    const expense = {
      currency,
      description,
      id: newID,
      exchangeRates,
      method,
      tag,
      value,
    };

    dispatchHandleFetchApi(expense);
    console.log(exchangeRates);
    this.setState({
      value: '',
      method: 'Dinheiro',
      description: '',
      tag: 'LAZER',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, method, description, currency, tag } = this.state;

    return (
      <div>
        <label htmlFor="description">
          Descrição da despesa
          <input
            name="description"
            type="text"
            value={ description }
            placeholder="Digite aqui"
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="category">
          <p>Categoria da despesa</p>
          <select
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Saúde</option>
            <option>Trabalho</option>
            <option>Transporte</option>
          </select>
        </label>

        <label htmlFor="value">
          <p>Valor</p>
          <input
            name="value"
            type="number"
            placeholder="Valor"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="method">
          <p>Método de Pagamento</p>
          <select
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
            <option>Dinheiro</option>
          </select>
        </label>

        <label htmlFor="currency">
          <p>Moeda</p>
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((item) => <option key={ item }>{ item }</option>)}
          </select>
        </label>

        <button
          type="button"
          onClick={ this.handleFetchApi }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchRequestAPI: () => dispatch(requestAPI()),
  dispatchHandleFetchApi: (expense) => dispatch(saveExpenses(expense)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  wallet: state.wallet,
});

WalletForm.propTypes = {
  dispatchRequestAPI: PropTypes.func.isRequired,
  dispatchHandleFetchApi: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.shape),
  }).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
