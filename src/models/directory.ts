export const DIRECTORY_TYPE_FOLDER = 'folder'
export const DIRECTORY_TYPE_POST = 'post'

export interface Directory {
  id: string
  parent_id: string
  owner_id: string
  classroom_id: string
  name: string
  type: 'folder' | 'post'
  color: string | null
  description: string | null
  files: File[] | null
  shared_with: UserWithAccess[] | null
  last_modified: Date
  date_created: Date
}

export interface Folder {
  id: string
  parent_id: string
  owner_id: string
  classroom_id: string
  name: string
  color: string
  description: string | null
  shared_with: UserWithAccess[] | null
  last_modified: Date
  date_created: Date
}

export interface Post {
  id: string
  parent_id: string
  owner_id: string
  classroom_id: string
  name: string
  description: string | null
  files: File[]
  shared_with: UserWithAccess[] | null
  last_modified: Date
  date_created: Date
}

export interface File {
  name: string
  link: string
  type: string
  size: number
}

export interface UserWithAccess {
  user_id: string
  access: string
}

interface Color {
  key: string
  name: string
  color: string
}

export const colors = <Color[]>[
  {
    key: 'maraschino',
    name: 'Maraschino',
    color: '#fa0405',
  },
  {
    key: 'cayenne',
    name: 'Cayenne',
    color: '#a90408',
  },
  {
    key: 'maroon',
    name: 'Maroon',
    color: '#aa0451',
  },
  {
    key: 'plum',
    name: 'Plum',
    color: '#a50492',
  },
  {
    key: 'eggplant',
    name: 'Eggplant',
    color: '#5c04a0',
  },
  {
    key: 'grape',
    name: 'Grape',
    color: '#ab04fb',
  },
  {
    key: 'orchid',
    name: 'Orchid',
    color: '#816bf9',
  },
  {
    key: 'lavender',
    name: 'Lavender',
    color: '#e7cbeb',
  },
  {
    key: 'carnation',
    name: 'Carnation',
    color: '#fc72d5',
  },
  {
    key: 'strawberry',
    name: 'Strawberry',
    color: '#fa0593',
  },
  {
    key: 'bubblegum',
    name: 'Bubblegum',
    color: '#f95cfc',
  },
  {
    key: 'magenta',
    name: 'Magenta',
    color: '#fc04fa',
  },
  {
    key: 'salmon',
    name: 'Salmon',
    color: '#fa7272',
  },
  {
    key: 'tangerine',
    name: 'Tangerine',
    color: '#fc8c04',
  },
  {
    key: 'cantaloupe',
    name: 'Cantaloupe',
    color: '#ece5cb',
  },
  {
    key: 'banana',
    name: 'Banana',
    color: '#f9fc56',
  },
  {
    key: 'lemon',
    name: 'Lemon',
    color: '#fbfc06',
  },
  {
    key: 'honeydew',
    name: 'Honeydew',
    color: '#c2fc59',
  },
  {
    key: 'lime',
    name: 'Lime',
    color: '#36fc07',
  },
  {
    key: 'spring',
    name: 'Spring',
    color: '#0cfa0c',
  },
  {
    key: 'clover',
    name: 'Clover',
    color: '#069705',
  },
  {
    key: 'fern',
    name: 'Fern',
    color: '#169a04',
  },
  {
    key: 'moss',
    name: 'Moss',
    color: '#059947',
  },
  {
    key: 'flora',
    name: 'Flora',
    color: '#04fb60',
  },
  {
    key: 'sea foam',
    name: 'Sea Foam',
    color: '#08fa86',
  },
  {
    key: 'spindrift',
    name: 'Spindrift',
    color: '#06fcd4',
  },
  {
    key: 'teal',
    name: 'Teal',
    color: '#049691',
  },
  {
    key: 'sky',
    name: 'Sky',
    color: '#3ad5fc',
  },
  {
    key: 'turquoise',
    name: 'Turquoise',
    color: '#1eeffa',
  },
]
