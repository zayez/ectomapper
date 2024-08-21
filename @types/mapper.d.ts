import { cloneDeep } from "lodash"

type MapperFunction<TSource, TDestination> = (source: TSource) => TDestination

interface AutoMapper {
  createMap<TSource, TDestination>(
    sourceKey: string,
    destinationKey: string,
    mappingFunction: MapperFunction<TSource, TDestination>
  ): void
  map<TSource, TDestination>(
    source: TSource,
    sourceKey: string,
    destinationKey: string
  ): TDestination
}

declare function createAutoMapper(): AutoMapper

export { createAutoMapper, MapperFunction, AutoMapper }
