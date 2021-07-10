import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            plot {
                plot_position_x
                plot_position_z
                buildings {
                    building_position_x
                    building_position_y
                    building_position_z
                    building_color_r
                    building_color_g
                    building_color_b
                    type {
                        type
                    }
                }
            }
        }
    }
`;

export const GET_CITY = gql`
    query city {
        city {
            plot {
                plot_position_x
                plot_position_z
                buildings {
                    building_position_x
                    building_position_y
                    building_position_z
                    building_color_r
                    building_color_g
                    building_color_b
                    type {
                        type
                    }

                }
            }
        }
    }
`