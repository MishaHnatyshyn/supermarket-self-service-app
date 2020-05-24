import React from 'react';
import {
  StyleSheet, View, Text, ScrollView, RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import ReceiptCard from '../components/ReceiptCard';
import { $black, $creamWhite } from '../constants/Colors';
import { getMonthNameByIndex } from '../utils/helpers';
import { areReceiptsLoading, getReceipts } from '../store/receipts/selectors';
import { fetchReceipts } from '../store/receipts/asyncActions';
import EmptyStateMessage from '../components/EmptyStateMessage';

function MonthDivider({ month }) {
  return (
    <View style={styles.monthDivision}>
      <Text style={styles.monthName}>{month}</Text>
    </View>
  );
}

const EMPTY_RECEIPTS_LIST_MESSAGE = 'You have no orders yet :(';

const getMonth = (timestamp) => new Date(timestamp).getMonth();

function ReceiptsListScreen({ receipts, fetchReceiptsData, isLoading }) {
  React.useEffect(() => {
    if (receipts.length === 0) fetchReceiptsData();
  }, []);
  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchReceiptsData} />}
    >
      <View style={styles.container}>
        {receipts.length === 0 && !isLoading && (
          <EmptyStateMessage message={EMPTY_RECEIPTS_LIST_MESSAGE} />
        )}
        {receipts.map((receipt, index) => {
          const currentMonth = getMonth(receipt.timestamp);
          const prevMonth = index > 0 ? getMonth(receipts[index - 1].timestamp) : -1;
          const shouldRenderMonthDivider = prevMonth !== currentMonth;
          return (
            <>
              {shouldRenderMonthDivider && (
                <MonthDivider month={getMonthNameByIndex(currentMonth)} />
              )}
              <ReceiptCard {...receipt} />
            </>
          );
        })}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: areReceiptsLoading,
  receipts: getReceipts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchReceiptsData: () => {
    dispatch(fetchReceipts());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptsListScreen);

ReceiptsListScreen.propTypes = {
  receipts: PropTypes.arrayOf(PropTypes.shape({
    timestamp: PropTypes.string,
  })).isRequired,
  fetchReceiptsData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

MonthDivider.propTypes = {
  month: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  monthDivision: {
    backgroundColor: $creamWhite,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 7,
    paddingBottom: 7,
    marginBottom: 10,
    marginTop: 10,
    width: 130,
    shadowColor: $black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  monthName: {
    color: $black,
    fontSize: 16,
  },
  container: {
    alignItems: 'center',
  },
});
