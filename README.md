# ectomapper

A lightweight, flexible, and type-safe AutoMapper utility for TypeScript, allowing you to easily map between different object types.

## Features

- **Type-safe mappings**: Leverage TypeScript generics to ensure type safety when mapping between object types.
- **Flexible configuration**: Define custom mappings between any two types using string keys.

## Installation

To install the package:

```bash
npm i ectomapper
```

## Usage

### Basic example

Here’s how to create and use an AutoMapper in your TypeScript project:

```ts
import { createAutoMapper } from "ectomapper"

// Define your source and destination types
interface SourceType {
  id: number
  name: string
}

interface DestinationType {
  id: number
  fullName: string
}

// Create an instance of AutoMapper
const autoMapper = createAutoMapper()

// Define a map between SourceType and DestinationType
autoMapper.createMap<SourceType, DestinationType>(
  "SourceType",
  "DestinationType",
  (source) => ({
    id: source.id,
    fullName: source.name,
  })
)

// Use the map to transform an object
const source: SourceType = { id: 1, name: "John Doe" }
const destination = autoMapper.map<SourceType, DestinationType>(
  source,
  "SourceType",
  "DestinationType"
)

console.log(destination) // Output: { id: 1, fullName: 'John Doe' }
```

### Advanced example

You can define multiple mappings for different types:

```ts
interface UserDTO {
  userId: number
  username: string
}

interface User {
  id: number
  name: string
}

// Create mappings
autoMapper.createMap<UserDTO, User>("UserDTO", "User", (source) => ({
  id: source.userId,
  name: source.username,
}))

autoMapper.createMap<User, UserDTO>("User", "UserDTO", (source) => ({
  userId: source.id,
  username: source.name,
}))

// Map between UserDTO and User
const userDTO: UserDTO = { userId: 42, username: "johndoe" }
const user = autoMapper.map<UserDTO, User>(userDTO, "UserDTO", "User")

console.log(user) // Output: { id: 42, name: 'johndoe' }
```

### Error Handling

If you attempt to map an object without a corresponding mapping, an error will be thrown:

```ts
try {
  const unknownMapping = autoMapper.map<SourceType, DestinationType>(
    source,
    "UnknownSource",
    "UnknownDestination"
  )
} catch (error) {
  console.error(error.message) // Output: No mapping found for key: UnknownSource->UnknownDestination
}
```

## API

### `createMap`

```ts
createMap<TSource, TDestination>(
  sourceKey: string,
  destinationKey: string,
  mappingFunction: MapperFunction<TSource, TDestination>
): void
```

Defines a mapping between two types using the provided string keys.

- **sourceKey**: A string that identifies the source type.
- **destinationKey**: A string that identifies the destination type.
- **mappingFunction**: A function that defines how to map from the source type to the destination type.

### `map`

```ts
map<TSource, TDestination>(
  source: TSource,
  sourceKey: string,
  destinationKey: string
): TDestination
```

Maps an object from the source type to the destination type using the defined mapping.

- **source**: The object to map.
- **sourceKey**: The key identifying the source type.
- **destinationKey**: The key identifying the destination type.
- **Returns**: The mapped object of the destination type.

## Contributing

Contributions are welcome! Please submit issues and pull requests to help improve the package.

## License

This project is licensed under the terms of the MIT License.
