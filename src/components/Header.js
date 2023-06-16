import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <h2 data-testid="total-field">
          { expenses.length < 1 ? ('0.00') : (expenses
            .reduce((acc, curr) => acc + (Number(curr.value) * curr
              .exchangeRates[curr.currency].ask), 0)
            .toFixed(2))}
        </h2>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, null)(Header);
