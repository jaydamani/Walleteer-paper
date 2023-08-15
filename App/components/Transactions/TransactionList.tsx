import {
  ListRenderItemInfo,
  SectionList,
  TextStyle,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import { List, Avatar, useTheme, Text } from 'react-native-paper';
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
  const sections = [
    {
      title: 'Section 1',
      data: transactions,
    },
  ];
  return (
    <SectionList
      sections={sections}
      stickySectionHeadersEnabled
      keyExtractor={t => t.id.toString()}
      renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
      renderItem={renderTransaction}
    />
  );
}

function renderTransaction({
  item: { amount, icon, title, date, category },
}: ListRenderItemInfo<Transaction>) {
  const Right = () => {
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
  };
  const Left = (props: { color: string; style: ViewStyle }) => {
    const fontSize = useWindowDimensions().fontScale;
    const theme = useTheme();
    return icon ? (
      <List.Icon {...props} icon={icon} />
    ) : (
      <Avatar.Text
        size={40.5 * fontSize}
        color={theme.colors.onPrimary}
        label={category}
      />
    );
  };

  function onPress() {
    return console.log('Form SoonTM');
  }

  return (
    <List.Item
      title={title}
      left={Left}
      right={Right}
      description={date.toDateString()}
      onPress={onPress}
    />
  );
}
