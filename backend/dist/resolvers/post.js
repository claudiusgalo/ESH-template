"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolver = void 0;
require("reflect-metadata");
const Post_1 = require("../entities/Post");
const type_graphql_1 = require("type-graphql");
const isAuth_1 = require("../middleware/isAuth");
const data_source_1 = __importDefault(require("../data-source"));
const User_1 = require("../entities/User");
const client_s3_1 = require("@aws-sdk/client-s3");
const moment_1 = __importDefault(require("moment"));
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
let PostInput = class PostInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], PostInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], PostInput.prototype, "text", void 0);
PostInput = __decorate([
    (0, type_graphql_1.InputType)()
], PostInput);
let PaginationInput = class PaginationInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], PaginationInput.prototype, "cursor", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], PaginationInput.prototype, "limit", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], PaginationInput.prototype, "direction", void 0);
PaginationInput = __decorate([
    (0, type_graphql_1.InputType)()
], PaginationInput);
let PaginatedPosts = class PaginatedPosts {
};
__decorate([
    (0, type_graphql_1.Field)(() => [Post_1.Post]),
    __metadata("design:type", Array)
], PaginatedPosts.prototype, "posts", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PaginatedPosts.prototype, "hasMore", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PaginatedPosts.prototype, "hasPrevious", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User),
    __metadata("design:type", User_1.User)
], PaginatedPosts.prototype, "creator", void 0);
PaginatedPosts = __decorate([
    (0, type_graphql_1.ObjectType)()
], PaginatedPosts);
let SignedImageOutput = class SignedImageOutput {
};
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], SignedImageOutput.prototype, "getObjectKeys", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], SignedImageOutput.prototype, "signedUrls", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], SignedImageOutput.prototype, "imageUrls", void 0);
SignedImageOutput = __decorate([
    (0, type_graphql_1.ObjectType)()
], SignedImageOutput);
let PostResolver = class PostResolver {
    textSnippet(root) {
        const text = root.text;
        if (text.length <= 50) {
            return text;
        }
        else {
            return text.slice(0, 50) + '...';
        }
    }
    async signImages(images) {
        try {
            console.log('You have just called the signImages mutation');
            const s3 = new client_s3_1.S3Client({
                region: process.env.BUCKET_REGION,
                credentials: {
                    accessKeyId: process.env.ACCESS_KEY,
                    secretAccessKey: process.env.SECRET_ACCESS_KEY,
                },
            });
            const getObjectKeys = [];
            const signedUrls = [];
            const imageUrls = [];
            for (const image of images) {
                const date = (0, moment_1.default)().format('YYYYMMDD');
                const randomString = Math.random().toString(36).substring(2, 7);
                const cleanFileName = image.toLowerCase().replace(/[^a-z0-9]/g, '-');
                const getObjectKey = `images/${date}-${randomString}-${cleanFileName}`;
                const imageUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env
                    .BUCKET_REGION}.amazonaws.com/${getObjectKey}`;
                console.log('This is the getObjectKey that we have generated: ', getObjectKey);
                console.log('This is the imageUrl that we have generated: ', imageUrl);
                const putObjectParams = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: getObjectKey,
                    ContentType: 'image/*',
                };
                const command = new client_s3_1.PutObjectCommand(putObjectParams);
                const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                imageUrls.push(imageUrl);
                getObjectKeys.push(getObjectKey);
                signedUrls.push(url);
            }
            console.log('Generated getObjectKeys:', getObjectKeys);
            console.log('Generated signedUrls:', signedUrls);
            console.log('Generated imageUrls:', imageUrls);
            return { imageUrls, getObjectKeys, signedUrls };
        }
        catch (error) {
            console.error('Error signing the image URLs', error);
            throw new Error('Error signing the image URLs.');
        }
    }
    async createPost(input, imageUrls, { req }) {
        console.log('received imageUrls: ', imageUrls);
        const post = Post_1.Post.create(Object.assign(Object.assign({}, input), { creatorId: req.session.userId, imageUrls: imageUrls }));
        console.log('This is the post that we are creating: ', post);
        return post.save();
    }
    async userposts(username, pagination) {
        const { limit, cursor, direction } = pagination;
        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;
        const qb = data_source_1.default
            .getRepository(Post_1.Post)
            .createQueryBuilder('p')
            .innerJoinAndSelect('p.creator', 'u', 'u.username = :username', {
            username,
        });
        if (cursor) {
            const cursorId = parseInt(cursor, 10);
            if (direction === 'NEXT') {
                qb.where('p.id > :cursorId', { cursorId });
                qb.orderBy('p.id', 'ASC').addOrderBy('p.createdAt', 'ASC');
            }
            else if (direction === 'PREVIOUS') {
                qb.where('p.id < :cursorId', { cursorId });
                qb.orderBy('p.id', 'DESC').addOrderBy('p.createdAt', 'DESC');
            }
            else {
                throw new Error('Invalid pagination direction');
            }
        }
        else {
            qb.orderBy('p.id', 'ASC').addOrderBy('p.createdAt', 'ASC');
        }
        qb.take(realLimitPlusOne);
        try {
            const posts = await qb.getMany();
            let hasMore = false;
            if (posts.length === realLimitPlusOne) {
                hasMore = true;
                posts.pop();
            }
            if (direction === 'PREVIOUS') {
                posts.reverse();
            }
            return {
                posts,
                hasMore,
                hasPrevious: false,
            };
        }
        catch (error) {
            console.error('Error fetching posts:', error);
            throw new Error('Error fetching posts');
        }
    }
    async posts(limit, cursor) {
        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;
        const qb = await data_source_1.default
            .getRepository(Post_1.Post)
            .createQueryBuilder('p')
            .innerJoinAndSelect('p.creator', 'u', 'u.id = p.creator')
            .orderBy('p.id', 'ASC', 'NULLS FIRST')
            .take(realLimitPlusOne);
        if (cursor) {
            qb.where('p.id > :cursor', { cursor });
        }
        const posts = await qb.getMany();
        console.log(posts);
        return {
            posts: posts.slice(0, realLimit),
            hasMore: posts.length === realLimitPlusOne,
            hasPrevious: false,
        };
    }
    post(id) {
        console.log(id);
        return Post_1.Post.findOne({ where: { id }, relations: ['creator'] });
    }
    async updatePost(id, title) {
        const post = await Post_1.Post.findOne({ where: { id } });
        if (!post) {
            return null;
        }
        if (typeof title !== 'undefined') {
            await Post_1.Post.update({ id }, { title });
        }
        return post;
    }
    async deletePost(id) {
        await Post_1.Post.delete(id);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(() => String),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Post_1.Post]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "textSnippet", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => SignedImageOutput),
    __param(0, (0, type_graphql_1.Arg)('imagePreviews', () => [String])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "signImages", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Post_1.Post),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __param(1, (0, type_graphql_1.Arg)('imageUrls', () => [String])),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PostInput, Array, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    (0, type_graphql_1.Query)(() => PaginatedPosts),
    __param(0, (0, type_graphql_1.Arg)('username', () => String)),
    __param(1, (0, type_graphql_1.Arg)('pagination', () => PaginationInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, PaginationInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "userposts", null);
__decorate([
    (0, type_graphql_1.Query)(() => PaginatedPosts),
    __param(0, (0, type_graphql_1.Arg)('limit', () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)('cursor', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
__decorate([
    (0, type_graphql_1.Query)(() => Post_1.Post, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "post", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Post_1.Post, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)('title', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
PostResolver = __decorate([
    (0, type_graphql_1.Resolver)(Post_1.Post)
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=post.js.map