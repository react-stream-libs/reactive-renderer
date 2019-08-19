import {
  default as Logger,
} from '../../Logger'
import {
  getGrandparentComponent,
} from './Grandparent'
import {
  getChildComps,
} from './Child'
import { ICommonBlueprint } from '../ICommonBlueprint';

const logger = new Logger<ICommonBlueprint>()

const { GrandParent } = getGrandparentComponent(logger)

const { Child } = getChildComps(logger)

