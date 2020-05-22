import React from 'react';
import PropTypes from 'prop-types';
import ProductContainer from '../components/ProductContainer';
import ProductAddToBasketSection from '../components/ProductAddToBasketSection';


export default function ProductScreen({ route }) {
  const {
    id,
  } = route.params;
  const parsedId = parseInt(id, 10);
  return (
    <>
      <ProductContainer id={parsedId} />
      <ProductAddToBasketSection idFromParams={parsedId} />
    </>
  );
}


ProductScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
