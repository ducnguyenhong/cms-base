import { isEqual } from 'lodash';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import { RootState } from '../store';

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

export const getShowMenu = createDeepEqualSelector(
  (state: RootState) => state.menu,
  (menu) => menu.isShow,
);
