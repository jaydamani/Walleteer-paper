/**
 * @format
 */

import 'react-native';
// Note: import explicitly to use the types shipped with jest.
import { it } from '@jest/globals';
import React from 'react';
import renderer from 'react-test-renderer';

import { App } from '../App';

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  renderer.create(<App />);
});
