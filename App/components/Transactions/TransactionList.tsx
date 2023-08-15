import { useCallback } from 'react';
import { TextStyle, ViewStyle, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { List, Avatar, useTheme } from 'react-native-paper';
import Feather from 'react-native-vector-icons/MaterialCommunityIcons';

export interface Transaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: Date;
  icon?: string;
}

export function TransactionList({
  transactions,
}: {
  transactions: readonly Transaction[];
}) {
  return (
    <ScrollView>
      <List.Section style={{ marginLeft: 10 }}>
        <List.Subheader style={{ paddingVertical: 0 }}>test</List.Subheader>
        {transactions.map(transaction => (
          <Transaction key={transaction.id} {...transaction}></Transaction>
        ))}
      </List.Section>
    </ScrollView>
  );
}

function Transaction({ amount, category, date, title, icon }: Transaction) {
  const right = useCallback(() => {
    const rightStyle: TextStyle = {
      color: amount < 0 ? 'red' : 'green',
      textAlign: 'right',
    };
    return amount > 0 ? (
      <Feather style={rightStyle} name="plus">
        {amount}
      </Feather>
    ) : (
      <Feather style={rightStyle} name="minus">
        {-amount}
      </Feather>
    );
  }, [amount]);

  const left = useCallback(
    (props: { color: string; style: ViewStyle }) => {
      return icon ? (
        <List.Icon {...props} icon={icon} />
      ) : (
        <Avatar.Text
          size={40.5 * useWindowDimensions().fontScale}
          color={useTheme().colors.onPrimary}
          label={category}
        />
      );
    },
    [icon],
  );

  function onPress() {
    return console.log('Form not created!!');
  }

  return (
    <List.Item
      title={title}
      left={left}
      right={right}
      description={date.toDateString()}
      onPress={onPress}
    />
  );
}
