import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { ToolService } from './tool.service';
import { Tool } from './schema/tool.schema';

interface toolListModel {
  type: string;
  title: string;
  collection: Tool[];
}

const typeList = new Map([
  ['often', '常用工具'],
  ['chatGpt', 'ChatGpt'],
  ['icon', '图标库'],
  ['css-tool', 'css美化工具'],
  ['chrome-tool', 'Chrome插件推荐'],
]);

@Controller('tool')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Post('create')
  async create(@Body() createToolDto: CreateToolDto) {
    try {
      let toolTypeIdx = 0;
      const tools = await this.toolService.findToolForType(
        createToolDto.tool_type,
      );
      if (tools.length > 0) {
        const finallyTool = tools[tools.length - 1];
        toolTypeIdx = finallyTool.tool_idx + 1;
      }
      const createToolParams = {
        ...createToolDto,
        tool_idx: toolTypeIdx,
      };
      const tool = await this.toolService.create(createToolParams);
      return tool;
    } catch (error) {
      throw new InternalServerErrorException(error.msg);
    }
  }

  @Get('toolList')
  async toolList() {
    try {
      const toolTypes = await this.toolService.findToolTypes();
      const toolList = await Promise.all(
        toolTypes.map(async (type: string) => {
          let toolArr: toolListModel = {} as toolListModel;
          const tools = await this.toolService.findToolForType(type);
          toolArr = {
            type: type,
            title: typeList.get(type),
            collection: tools,
          };
          return toolArr;
        }),
      );
      return toolList;
    } catch (error) {
      throw new InternalServerErrorException(error.msg);
    }
  }
}
