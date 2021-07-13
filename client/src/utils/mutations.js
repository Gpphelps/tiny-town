import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_PLOT = gql` 
    mutation savePlot($plot_position_x: Int, $plot_position_z: Int, $buildings: String, $plotName: String) {
        savePlot(plot_position_x: $plot_position_x, plot_position_z: $plot_position_z, buildings: $buildings, $PlotName: $plotName) {
            username
            plot {
                _id
                plotName
                plot_position_x
                plot_position_z
                buildings {
                    _id
                    building_position_x
                    building_position_y
                    building_position_z
                    building_color_r
                    building_color_g
                    building_color_b
                    type 
                }
            }
        }
    }
`

export const REMOVE_BUILDING = gql` 
    mutation removeBuilding($_id: _id) {
        removeBuilding(_id: $_id) {
            username
            plot {
                buildings {
                    _id
                    building_position_x
                    building_position_y
                    building_position_z
                    building_color_r
                    building_color_g
                    building_color_b
                    type 
                }
            }
        }
    }
`

