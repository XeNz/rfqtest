import { TextDto } from "../models/models";

class RfqHelpService{
    getHelpHeaderText(): String {
      return "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
    }
    getHelpText(): Array<TextDto> {
        const text = Array.apply(null, Array(8)).map(function (x, i) {
            return {
              id: i,
              title: 'Lorem ipsum dolor sit amet',
              text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.',
            };
          });
          return text;
    }
}

export const rfqService = new RfqHelpService();
