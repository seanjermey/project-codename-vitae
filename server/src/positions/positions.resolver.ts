import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PositionType } from './position.type';
import { PositionsService } from './positions.service';
import { CreatePositionInput } from './create-position.input';
import { UpdatePositionInput } from './update-position.input';

@Resolver((of) => PositionType)
export class PositionsResolver {
  constructor(private positionsService: PositionsService) {}

  /**
   *
   */
  @Query((returns) => [PositionType])
  positions() {
    return this.positionsService.list();
  }

  /**
   *
   * @param id
   */
  @Query((returns) => PositionType)
  position(@Args('id') id: string) {
    return this.positionsService.read(id);
  }

  /**
   *
   * @param positionInput
   */
  @Mutation((returns) => PositionType)
  createPosition(@Args('position') positionInput: CreatePositionInput) {
    return this.positionsService.create(positionInput);
  }

  /**
   *
   * @param positionInput
   */
  @Mutation((returns) => PositionType)
  updatePosition(@Args('position') positionInput: UpdatePositionInput) {
    return this.positionsService.update(positionInput);
  }
}
