import { cloneDeep } from "lodash"

type MapperFunction<TSource, TDestination> = (source: TSource) => TDestination

interface AutoMapper {
  mappings: Map<string, MapperFunction<any, any>>
  createMap<TSource, TDestination>(
    identifier: string,
    mappingFunction: MapperFunction<TSource, TDestination>
  ): void
  map<TSource, TDestination>(identifier: string, source: TSource): TDestination
}

export function createAutoMapper(): AutoMapper {
  const mappings = new Map<string, MapperFunction<any, any>>()

  return {
    mappings,
    createMap<TSource, TDestination>(
      identifier: string,
      mappingFunction: MapperFunction<TSource, TDestination>
    ) {
      mappings.set(identifier, mappingFunction)
    },

    map<TSource, TDestination>(
      identifier: string,
      source: TSource
    ): TDestination {
      const mapper = mappings.get(identifier) as MapperFunction<
        TSource,
        TDestination
      >
      if (!mapper) {
        throw new Error(`No mapping found for identifier: ${identifier}`)
      }
      return mapper(cloneDeep(source))
    },
  }
}
