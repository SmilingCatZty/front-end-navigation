import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { DocService } from './doc.service';
import { CreateDocDto } from './dto/create-doc.dto';
import { Doc } from './schema/doc.schema';

interface DocListMoedl {
  type: string;
  title: string;
  collection: Doc[];
}

@Controller('doc')
export class DocController {
  constructor(private readonly docService: DocService) {}

  @Post('create')
  async create(@Body() createDocDto: CreateDocDto) {
    try {
      let docTypeIdx = 0;
      const docs = await this.docService.findDocForType(createDocDto.doc_type);
      if (docs.length > 0) {
        const finallyDoc = docs[docs.length - 1];
        docTypeIdx = finallyDoc.doc_idx + 1;
      }
      const createDocParams = {
        ...createDocDto,
        doc_idx: docTypeIdx,
      };

      const doc = await this.docService.create(createDocParams);
      return doc;
    } catch (error) {
      throw new InternalServerErrorException(error.msg);
    }
  }

  @Get('list')
  async list() {
    try {
      const docs = await this.docService.findList();
      return docs;
    } catch (error) {
      throw new InternalServerErrorException(error.msg);
    }
  }

  @Get('docList')
  async docList() {
    try {
      const docTypes = await this.docService.findDocTypes();
      const docList = await Promise.all(
        docTypes.map(async (type: string) => {
          const docArr: DocListMoedl[] = [];
          const docs = await this.docService.findDocForType(type);
          switch (type) {
            case 'front-web-frame':
              docArr.push({
                type: type,
                title: '前端基础框架',
                collection: docs,
              });
            case 'front-node-frame':
              docArr.push({
                type: type,
                title: 'Node框架',
                collection: docs,
              });
            case 'applet':
              docArr.push({
                type: type,
                title: '小程序',
                collection: docs,
              });
            case 'computer-network':
              docArr.push({
                type: type,
                title: '计算机网络',
                collection: docs,
              });
            default:
              break;
          }
          return docArr;
        }),
      );
      return docList;
    } catch (error) {
      throw new InternalServerErrorException(error.msg);
    }
  }
}
