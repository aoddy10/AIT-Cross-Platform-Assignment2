import React from 'react';
import {StyleSheet} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

const FormulaItem = ({formula, onSelectFormula}) => {
  return (
    <Card style={styles.card}>
      <Card.Title title={formula.name} style={styles.title} />
      <Card.Content>
        <Title style={styles.equation}>{formula.equation}</Title>
        <Paragraph style={styles.description}>{formula.description}</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.actionSection}>
        <Button onPress={() => onSelectFormula(formula)}>OK</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    elevation: 16,
  },
  title: {
    backgroundColor: '#4f4f4f',
  },
  text: {
    fontSize: 16,
  },
  equation: {},
  actionSection: {
    justifyContent: 'flex-end',
  },
});

export default FormulaItem;
