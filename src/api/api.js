import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the DB.
 * Also in includes axios requests for the MLB API to retieve team and player data.
 *
 * This might take a variable we make with the data in state assigned to another variable on the front end as the parameter to the API and the endpoint we want to send it to.
 * It should return the data from the API.
 * It should handle any errors from the API.
 *
 */

class MLBApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    // * first slash is already included before endpoint then endpoint name: ex teams vs /teams.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${MLBApi.token}` };
    const params = method === 'get' ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes for interacting with DB using front end data.
  // These methods will deal with creating, login, and getting current users from the DB.

  static async register(formData) {
    console.log(formData);
    let res = await this.request('auth/register', formData, 'post');
    return res.token;
  }

  static async login(formData) {
    console.log(formData);
    let res = await this.request('auth/token', formData, 'post');
    return res.token;
  }

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // MLB API routes for interacting with MLB API to get team and player data.
  static async getTeams(year) {
    const res = await axios.get(
      `http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season=${year}`
    );
    const teamData = res.data.team_all_season.queryResults.row.map((team) => {
      return {
        name: team.name_display_full,
        id: team.mlb_org_id,
      };
    });
    return teamData;
  }

  static async getTeamRoster(id) {
    const res = await axios.get(
      `http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id=${id}`
    );
    const currentRoster = res.data.roster_40.queryResults.row.map((roster) => {
      return {
        name: roster.name_display_first_last,
        position: roster.position_txt,
      };
    });
    return currentRoster;
  }

  // userId is from the logged in user object user.id and teamData is the team object created on the frontend and in state starters.
  // These methods will deal with creating, getting, and deleting teams from the DB based on logged in user.
  // * We get user id on every logged in and registered user.
  static async createTeam(userId, teamData) {
    let res = await this.request('teams', { userId, teamData }, 'post');
    return res.team;
  }

  static async getUserTeams(userId) {
    console.log(userId);
    let res = await this.request(`teams/user/${userId}`);
    console.log('RESPONSE', res);
    // * must match all backend res which is in a res.allTeams variable.
    return res.userTeams;
  }

  static async deleteTeam(teamId) {
    let res = await this.request(`teams/${teamId}`, {}, 'delete');
    return res;
  }

  // * The sql query will delete the user and all the teams associated with that user by the foreign key.
  static async deleteUser(username) {
    let res = await this.request(`users/${username}`, {}, 'delete');
    return res;
  }
}

export default MLBApi;
