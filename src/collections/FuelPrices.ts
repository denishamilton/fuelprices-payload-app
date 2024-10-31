import type { CollectionConfig } from 'payload'

export const FuelPrices: CollectionConfig = {
    slug: 'fuel-prices',
    labels: {
      singular: 'Fuel Price',
      plural: 'Fuel Prices',
    },
    fields: [
      {
        name: 'stationId',
        type: 'text',
        label: 'Station ID',
        required: true,
        unique: true,
      },
      {
        name: 'name',
        type: 'text',
        label: 'Station Name',
      },
      {
        name: 'brand',
        type: 'text',
        label: 'Brand',
      },
      {
        name: 'address',
        type: 'text',
        label: 'Address',
      },
      {
        name: 'latitude',
        type: 'number',
        label: 'Latitude',
      },
      {
        name: 'longitude',
        type: 'number',
        label: 'Longitude',
      },
      {
        name: 'distance',
        type: 'number',
        label: 'Distance (km)',
      },
      {
        name: 'dieselPrice',
        type: 'number',
        label: 'Diesel Price',
      },
      {
        name: 'e5Price',
        type: 'number',
        label: 'E5 Price',
      },
      {
        name: 'e10Price',
        type: 'number',
        label: 'E10 Price',
      },
      {
        name: 'isOpen',
        type: 'checkbox',
        label: 'Is Open',
      },
],
}
