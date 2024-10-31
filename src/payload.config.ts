// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { FuelPrices } from './collections/FuelPrices'
import axios from 'axios'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, FuelPrices],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
  onInit: async (payload) => {
    console.log('Payload initialized');

    const apiKey = process.env.TANKERKOENIG_API_KEY;
    const url = `https://creativecommons.tankerkoenig.de/json/list.php?lat=54.3233&lng=10.1228&rad=25&type=all&apikey=${apiKey}`;

    try {
      const response = await axios.get(url);
      const stations = response.data.stations;

      for (const station of stations) {
        await payload.create({
          collection: 'fuel-prices',
          data: {
            stationId: station.id,
            name: station.name,
            brand: station.brand,
            address: `${station.street} ${station.houseNumber}, ${station.postCode} ${station.place}`,
            latitude: station.lat,
            longitude: station.lng,
            distance: station.dist,
            dieselPrice: station.diesel,
            e5Price: station.e5,
            e10Price: station.e10,
            isOpen: station.isOpen,
          },
        });
      }

      console.log('Данные о заправках успешно сохранены в базу данных');
    } catch (error) {
      console.error('Ошибка при сохранении данных о заправках:', error);
    }
  },
})
