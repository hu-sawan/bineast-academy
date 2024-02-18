import "./Video.scss";
import { useParams } from "react-router-dom";

function Video() {
    const { vidId } = useParams();

    // API call to get video link and details
    interface videoType {
        id: string | number; // TODO: change later make it of one type
        title: string;
        description: string;
        url: string;
    }

    // const video: videoType = apiCall();
    const video: videoType = {
        id: 1,
        title: "What are variables",
        description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos unde velit ullam odio sequi accusantium dolorum dolor iure! Eius autem facere, molestiae accusantium libero eligendi voluptas ullam nostrum explicabo sapiente quibusdam non, maxime voluptates exercitationem unde beatae nulla et architecto laborum, veniam totam? Ab rerum dicta, quod voluptate corporis sunt alias quas quia ex culpa nesciunt iusto amet. Cupiditate commodi deserunt modi iste, quibusdam nisi ipsum omnis, officiis libero quidem labore ullam maiores error ducimus similique, saepe dolor illo perferendis. Autem architecto, iusto accusamus quae reprehenderit iste. Mollitia, facere nesciunt eveniet accusantium quod nihil ullam corporis harum dolorum cupiditate minus aliquid et assumenda tempora, possimus soluta at unde natus explicabo obcaecati placeat odio blanditiis dignissimos? Recusandae, soluta eveniet voluptatem dolorum sapiente corporis expedita rem labore quidem possimus atque non distinctio fugit quam, maiores quis temporibus porro quisquam aut totam nostrum? Quam amet corrupti quas dolorem et accusamus sed, a architecto optio. Vel doloremque, aliquam earum, vitae quaerat ullam magnam libero minus, eligendi nihil provident veniam rerum quibusdam. Eos voluptates debitis consequuntur tempora porro vitae natus veniam, quod sunt, eum fugit error in dicta magni doloribus exercitationem neque. Minima vel, reiciendis corporis doloribus reprehenderit exercitationem libero temporibus incidunt repellendus voluptate. Error, enim nam, minus inventore fugiat nulla velit quod odio rem, blanditiis repellendus nesciunt. Magni nulla nesciunt perspiciatis eum molestiae! Maiores tenetur voluptatem eius ipsa libero. At, dolores et? Minima necessitatibus dignissimos enim temporibus ducimus incidunt inventore est placeat, esse dolor omnis nisi quas sunt asperiores vitae quos alias repellendus eos doloribus eligendi quae fuga maxime. Distinctio, in obcaecati corporis aut ea inventore eum maiores deserunt provident voluptatum placeat fugiat repellendus facere, dolore dicta animi sint fugit similique a, esse fuga aliquam accusantium. Excepturi corporis recusandae quo! Natus sed vero enim corporis temporibus eius, dicta reprehenderit itaque commodi recusandae sapiente nobis eveniet, similique voluptate laudantium laborum eligendi quidem cum, illum pariatur magni ipsum. Quod magni nam accusamus vel pariatur non nobis alias molestiae ut aliquam officia ab itaque, reprehenderit praesentium quas qui quaerat, reiciendis hic laborum nostrum! Non earum accusamus ipsum ea distinctio sequi iusto fugit amet magnam reprehenderit, consectetur repudiandae eligendi alias quos iure. Vel itaque amet accusantium illum enim dolor culpa numquam soluta dolorum ullam commodi quasi deleniti adipisci nisi, repellendus facere vero tempora nostrum? Libero atque velit cum, ullam quisquam sequi, perferendis saepe obcaecati, ex accusamus dolore nisi est! Ipsum modi dignissimos id reprehenderit tenetur possimus eveniet ullam necessitatibus, labore vero? Minima corrupti voluptates praesentium vitae cupiditate temporibus ducimus animi odit, placeat culpa adipisci eum, vel unde nihil, dolore necessitatibus doloremque at. Ipsam odio deleniti, provident magni, accusantium recusandae iure perspiciatis, ea suscipit eaque modi pariatur asperiores soluta possimus beatae. Dolorum commodi amet nulla animi autem vero est obcaecati eius vitae fugiat consequuntur alias modi porro aut incidunt, tempore doloremque fugit explicabo voluptatem. Repellendus fuga esse ipsam sit, necessitatibus vel, quos, odio animi at maxime soluta ea porro corporis odit perspiciatis totam repudiandae minus impedit similique aliquam? Dolorum eaque natus fugit blanditiis est repudiandae veritatis adipisci eius fugiat?\n\n\nLorem ipsum dolor sit amet consectetur, adipisicing elit. Quos unde velit ullam odio sequi accusantium dolorum dolor iure! Eius autem facere, molestiae accusantium libero eligendi voluptas ullam nostrum explicabo sapiente quibusdam non, maxime voluptates exercitationem unde beatae nulla et architecto laborum, veniam totam? Ab rerum dicta, quod voluptate corporis sunt alias quas quia ex culpa nesciunt iusto amet. Cupiditate commodi deserunt modi iste, quibusdam nisi ipsum omnis, officiis libero quidem labore ullam maiores error ducimus similique, saepe dolor illo perferendis. Autem architecto, iusto accusamus quae reprehenderit iste. Mollitia, facere nesciunt eveniet accusantium quod nihil ullam corporis harum dolorum cupiditate minus aliquid et assumenda tempora, possimus soluta at unde natus explicabo obcaecati placeat odio blanditiis dignissimos? Recusandae, soluta eveniet voluptatem dolorum sapiente corporis expedita rem labore quidem possimus atque non distinctio fugit quam, maiores quis temporibus porro quisquam aut totam nostrum? Quam amet corrupti quas dolorem et accusamus sed, a architecto optio. Vel doloremque, aliquam earum, vitae quaerat ullam magnam libero minus, eligendi nihil provident veniam rerum quibusdam. Eos voluptates debitis consequuntur tempora porro vitae natus veniam, quod sunt, eum fugit error in dicta magni doloribus exercitationem neque. Minima vel, reiciendis corporis doloribus reprehenderit exercitationem libero temporibus incidunt repellendus voluptate. Error, enim nam, minus inventore fugiat nulla velit quod odio rem, blanditiis repellendus nesciunt. Magni nulla nesciunt perspiciatis eum molestiae! Maiores tenetur voluptatem eius ipsa libero. At, dolores et? Minima necessitatibus dignissimos enim temporibus ducimus incidunt inventore est placeat, esse dolor omnis nisi quas sunt asperiores vitae quos alias repellendus eos doloribus eligendi quae fuga maxime. Distinctio, in obcaecati corporis aut ea inventore eum maiores deserunt provident voluptatum placeat fugiat repellendus facere, dolore dicta animi sint fugit similique a, esse fuga aliquam accusantium. Excepturi corporis recusandae quo! Natus sed vero enim corporis temporibus eius, dicta reprehenderit itaque commodi recusandae sapiente nobis eveniet, similique voluptate laudantium laborum eligendi quidem cum, illum pariatur magni ipsum. Quod magni nam accusamus vel pariatur non nobis alias molestiae ut aliquam officia ab itaque, reprehenderit praesentium quas qui quaerat, reiciendis hic laborum nostrum! Non earum accusamus ipsum ea distinctio sequi iusto fugit amet magnam reprehenderit, consectetur repudiandae eligendi alias quos iure. Vel itaque amet accusantium illum enim dolor culpa numquam soluta dolorum ullam commodi quasi deleniti adipisci nisi, repellendus facere vero tempora nostrum? Libero atque velit cum, ullam quisquam sequi, perferendis saepe obcaecati, ex accusamus dolore nisi est! Ipsum modi dignissimos id reprehenderit tenetur possimus eveniet ullam necessitatibus, labore vero? Minima corrupti voluptates praesentium vitae cupiditate temporibus ducimus animi odit, placeat culpa adipisci eum, vel unde nihil, dolore necessitatibus doloremque at. Ipsam odio deleniti, provident magni, accusantium recusandae iure perspiciatis, ea suscipit eaque modi pariatur asperiores soluta possimus beatae. Dolorum commodi amet nulla animi autem vero est obcaecati eius vitae fugiat consequuntur alias modi porro aut incidunt, tempore doloremque fugit explicabo voluptatem. Repellendus fuga esse ipsam sit, necessitatibus vel, quos, odio animi at maxime soluta ea porro corporis odit perspiciatis totam repudiandae minus impedit similique aliquam? Dolorum eaque natus fugit blanditiis est repudiandae veritatis adipisci eius fugiat?",
        url: "https://firebasestorage.googleapis.com/v0/b/academy-dev-40dc9.appspot.com/o/2024-02-18%2013-14-40.mp4?alt=media&token=fd9d4983-77d4-4290-9c16-6e8950234214",
    };

    return (
        <div className="video">
            <h2>{video.title}</h2>
            <video controls>
                <source src={video.url} type="video/mp4" />
            </video>
            <div className="video__description">{video.description}</div>
        </div>
    );
}

export default Video;