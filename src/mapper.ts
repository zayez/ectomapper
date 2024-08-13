import { cloneDeep, create } from "lodash"

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

function createAutoMapper(): AutoMapper {
  const mappings = new Map<string, MapperFunction<any, any>>()

  function getMappingKey(sourceKey: string, destinationKey: string): string {
    return `${sourceKey}->${destinationKey}`
  }

  return {
    createMap<TSource, TDestination>(
      sourceKey: string,
      destinationKey: string,
      mappingFunction: MapperFunction<TSource, TDestination>
    ): void {
      const key = getMappingKey(sourceKey, destinationKey)
      mappings.set(key, mappingFunction)
    },

    map<TSource, TDestination>(
      source: TSource,
      sourceKey: string,
      destinationKey: string
    ): TDestination {
      const key = getMappingKey(sourceKey, destinationKey)
      const mapper = mappings.get(key) as MapperFunction<TSource, TDestination>
      if (!mapper) {
        throw new Error(`No mapping found for key: ${key}`)
      }
      return mapper(cloneDeep(source))
    },
  }
}

export { createAutoMapper }

export default createAutoMapper
